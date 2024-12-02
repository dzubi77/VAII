package vaii_sp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.service.CourseService;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        System.out.println(course.toString());
        Course c = courseService.addCourse(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(c);
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> list = courseService.getAllCourses();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable UUID id) {
        Course course = courseService.getCourseById(id);
        return course != null ? ResponseEntity.ok(course)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable UUID id) {
        try {
            courseService.deleteCourse(id);
            return ResponseEntity.ok("Course has been deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Such course does not exist!");
        }
    }
}
