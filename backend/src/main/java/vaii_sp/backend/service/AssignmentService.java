package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.model.Assignment;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.repository.AssignmentRepository;
import vaii_sp.backend.repository.CourseRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final CourseRepository courseRepository;

    public Assignment addAssignment(UUID courseId, Assignment assignment) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course != null) {
            assignment.setCourse(course);
            return assignmentRepository.save(assignment);
        }
        return null;
    }

    public Assignment getAssignmentById(UUID id) {
        return assignmentRepository.findById(id).orElse(null);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public List<Assignment> getAssignmentsByCourse(UUID courseId) {
        return assignmentRepository.findByCourse_CourseId(courseId);
    }

    public Assignment updateAssignment(Assignment assignment, UUID id) {
        Assignment oldAssignment = assignmentRepository.findById(id).orElse(null);
        if (oldAssignment != null) {
            if (assignment.getAssignmentDescription() != null) {
                oldAssignment.setAssignmentDescription(assignment.getAssignmentDescription());
            }
            if (assignment.getAssignmentDate() != null) {
                oldAssignment.setAssignmentDate(assignment.getAssignmentDate());
            }
            return assignmentRepository.save(oldAssignment);
        }
        return null;
    }

    public void deleteAssignment(UUID assignmentId) {
        assignmentRepository.deleteById(assignmentId);
    }
}
