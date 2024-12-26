package vaii_sp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vaii_sp.backend.model.User;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}