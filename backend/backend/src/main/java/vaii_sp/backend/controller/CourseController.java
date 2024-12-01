package vaii_sp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.service.CourseService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseService.addCourse(course);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable UUID id) {
        return courseService.getCourseById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable UUID id) {
        courseService.deleteCourse(id);
        return "Course with id [" + id + "] has been deleted";
    }
}
