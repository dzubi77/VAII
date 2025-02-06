package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.model.User;
import vaii_sp.backend.repository.CourseRepository;
import vaii_sp.backend.repository.FeedbackRepository;
import vaii_sp.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

//TODO: form fields validation

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final FeedbackRepository feedbackRepository;

    public Course addCourse(Course course, UUID instructorId) {
        User teacher = userRepository.findById(instructorId).orElse(null);
        if (teacher == null || !teacher.getUserRole().equals("TEACHER") || course.getStudentCount() < 0 || course.getMaxStudentCount() <= 0) {
            return null;
        }
        course.setInstructor(teacher);
        teacher.assignCourse(course, false);
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(UUID id) {
        Optional<Course> courseOpt = courseRepository.findById(id);
        if (courseOpt.isPresent()) {
            Course course = courseOpt.get();
            course.getStudentList();
            return course;
        } else {
            return null;
        }
    }

    public Course updateCourse(UUID id, Course course) {
        Course oldCourse = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        if (course == null || course.getStudentCount() < 0 || course.getMaxStudentCount() <= 0) {
            return null;
        }
        oldCourse.setCourseName(course.getCourseName());
        oldCourse.setCourseDescription(course.getCourseDescription());
        oldCourse.setMaxStudentCount(course.getMaxStudentCount());
        return courseRepository.save(oldCourse);
    }

    public void deleteCourseById(UUID id) {
        Course course = courseRepository.findById(id).isPresent() ? courseRepository.findById(id).get() : null;
        if (course != null) {
            for (var student : course.getStudents()) {
                dropStudent(course.getCourseId(), student.getUserId());
                userRepository.save(student);
            }
            userRepository.findById(course.getInstructor().getUserId()).ifPresent(teacher -> teacher.deleteAsInstructor(course));
            feedbackRepository.deleteAll(course.getFeedbacks());
            course.removeRelationships();
        }
        courseRepository.deleteById(id);
    }

    public boolean enrollStudent(UUID id, UUID studentId) {
        Course course = this.getCourseById(id);
        User student = userRepository.findById(studentId).orElse(null);
        if (course == null || student == null || !student.getUserRole().equals("STUDENT")) {
            return false;
        }
        if (course.getStudents().contains(student) || course.getStudentCount() == course.getMaxStudentCount()) {
            return false;
        }
        course.setStudentCount(course.getStudentCount() + 1);
        student.assignCourse(course, true);
        courseRepository.save(course);
        userRepository.save(student);
        return true;
    }

    public boolean dropStudent(UUID id, UUID studentId) {
        Course course = this.getCourseById(id);
        User student = userRepository.findById(studentId).orElse(null);
        if (course == null || student == null) {
            return false;
        }
        course.setStudentCount(course.getStudentCount() - 1);
        student.dropCourse(course);
        courseRepository.save(course);
        userRepository.save(student);
        return true;
    }
}

