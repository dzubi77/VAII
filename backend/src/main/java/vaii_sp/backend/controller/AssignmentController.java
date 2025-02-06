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
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) {
        Assignment a = assignmentService.addAssignment(assignment);
        return ResponseEntity.status(201).body(a);
    }

    @GetMapping
    public ResponseEntity<List<Assignment>> getAssignments() {
        List<Assignment> assignments = assignmentService.getAllAssignments();
        return assignments != null ?  ResponseEntity.ok(assignments) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignment(@PathVariable UUID id) {
        Assignment assignment = assignmentService.getAssignmentById(id);
        return assignment != null ? ResponseEntity.ok(assignment) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable UUID id, @RequestBody Assignment assignment) {
        Assignment updatedAssignment = assignmentService.updateAssignment(assignment, id);
        return updatedAssignment != null ? ResponseEntity.ok(updatedAssignment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable UUID id) {
        assignmentService.deleteAssignment(id);
        return ResponseEntity.noContent().build();
    }
}
