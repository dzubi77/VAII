package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.model.Assignment;
import vaii_sp.backend.repository.AssignmentRepository;

import java.util.List;
import java.util.UUID;

//TODO: form fields validation

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;

    public Assignment addAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public Assignment getAssignmentById(UUID id) {
        return assignmentRepository.findById(id).orElse(null);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment updateAssignment(Assignment assignment, UUID id) {
        Assignment oldAssignment = assignmentRepository.findById(id).orElse(null);
        if (oldAssignment != null) {
            oldAssignment.setAssignmentDescription(assignment.getAssignmentDescription());
            oldAssignment.setAssignmentDate(assignment.getAssignmentDate());
            return assignmentRepository.save(oldAssignment);
        } else {
            return null;
        }
    }

    public void deleteAssignment(UUID assignmentId) {
        assignmentRepository.deleteById(assignmentId);
    }
}
