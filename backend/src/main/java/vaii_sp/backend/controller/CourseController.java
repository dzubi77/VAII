package vaii_sp.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.model.User;
import vaii_sp.backend.service.CourseService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        Course c = courseService.addCourse(course);
        if (c == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(c);
    }

    @GetMapping("/allCourses")
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

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable UUID id, @RequestBody Course course) {
        Course updatedCourse = courseService.updateCourse(id, course);
        return ResponseEntity.ok(updatedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable UUID id) {
        try {
            courseService.deleteCourseById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{courseId}/enroll/{studentId}")
    public ResponseEntity<Void> enrollStudentToCourse(@PathVariable UUID courseId, @PathVariable UUID studentId) {
        if (courseService.enrollStudent(courseId, studentId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/{courseId}/drop/{studentId}")
    public ResponseEntity<Void> dropStudentFromCourse(@PathVariable UUID courseId, @PathVariable UUID studentId) {
        if (courseService.dropStudent(courseId, studentId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

