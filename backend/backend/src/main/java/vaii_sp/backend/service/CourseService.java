package vaii_sp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.repository.CourseRepository;

import java.util.List;
import java.util.UUID;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(UUID id) {
        return courseRepository.findById(id).isPresent() ? courseRepository.findById(id).get() : null;
    }

    public void deleteCourse(UUID id) {
        courseRepository.deleteById(id);
    }
}
