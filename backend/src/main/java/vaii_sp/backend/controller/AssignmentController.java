package vaii_sp.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vaii_sp.backend.model.Assignment;
import vaii_sp.backend.service.AssignmentService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/assignments")
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@RequestParam UUID courseId, @RequestBody Assignment assignment) {
        System.out.println(assignment.getAssignmentDate());
        System.out.println(assignment.getAssignmentDescription());
        System.out.println(assignment.getAssignmentTitle());
        Assignment a = assignmentService.addAssignment(courseId, assignment);
        return ResponseEntity.status(201).body(a);
    }

    @GetMapping
    public ResponseEntity<List<Assignment>> getAssignments() {
        List<Assignment> assignments = assignmentService.getAllAssignments();
        return assignments != null ?  ResponseEntity.ok(assignments) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{assignmentId}")
    public ResponseEntity<Assignment> getAssignment(@PathVariable UUID assignmentId) {
        Assignment assignment = assignmentService.getAssignmentById(assignmentId);
        return assignment != null ? ResponseEntity.ok(assignment) : ResponseEntity.notFound().build();
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Assignment>> getAssignmentsByCourse(@PathVariable UUID courseId) {
        List<Assignment> assignments = assignmentService.getAssignmentsByCourse(courseId);
        return ResponseEntity.ok(assignments);
    }

    @PostMapping("/{assignmentId}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable UUID assignmentId, @RequestBody Assignment assignment) {
        Assignment updatedAssignment = assignmentService.updateAssignment(assignment, assignmentId);
        return updatedAssignment != null ? ResponseEntity.ok(updatedAssignment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{assignmentId}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable UUID assignmentId) {
        assignmentService.deleteAssignment(assignmentId);
        return ResponseEntity.noContent().build();
    }
}
