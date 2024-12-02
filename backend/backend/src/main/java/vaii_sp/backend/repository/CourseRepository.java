package vaii_sp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vaii_sp.backend.model.Course;

import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
}
