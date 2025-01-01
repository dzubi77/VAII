package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.repository.CourseRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    public Course addCourse(Course course) {
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
        courseRepository.deleteById(id);
    }
}
