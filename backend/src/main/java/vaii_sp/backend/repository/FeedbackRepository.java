package vaii_sp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vaii_sp.backend.model.Feedback;

import java.util.UUID;

public interface FeedbackRepository extends JpaRepository<Feedback, UUID> {
}
