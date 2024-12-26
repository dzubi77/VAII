package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.model.User;
import vaii_sp.backend.repository.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id).isPresent() ? userRepository.findById(id).get() : null;
    }

    public User updateUser(UUID id, User user) {
        User u = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        u.setUsername(user.getUsername());
        u.setPassword(user.getPassword());
        return userRepository.save(u);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
