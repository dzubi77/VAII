package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.model.User;
import vaii_sp.backend.repository.CourseRepository;
import vaii_sp.backend.repository.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public Course addCourse(Course course) {
        User teacher = userRepository.findById(course.getInstructor().getUserId()).orElse(null);
        if (teacher == null || !teacher.getUserRole().equals("TEACHER")) {
            return null;
        }
        teacher.assignCourse(course, false);
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(UUID id) {
        return courseRepository.findById(id).isPresent() ? courseRepository.findById(id).get() : null;
    }

    public Course updateCourse(UUID id, Course course) {
        Course oldCourse = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
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
        }
        courseRepository.deleteById(id);
    }

    public boolean enrollStudent(UUID id, UUID studentId) {
        Course course = this.getCourseById(id);
        User student = userRepository.findById(studentId).orElse(null);
        if (course == null || student == null || !student.getUserRole().equals("STUDENT")) {
            return false;
        }
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
        student.dropCourse(course);
        courseRepository.save(course);
        userRepository.save(student);
        return true;
    }
}

