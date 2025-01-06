package vaii_sp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vaii_sp.backend.model.Assignment;

import java.util.UUID;

public interface AssignmentRepository extends JpaRepository<Assignment, UUID> {
}
