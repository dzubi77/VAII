package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import vaii_sp.backend.controller.UserWOP;
import vaii_sp.backend.model.User;
import vaii_sp.backend.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public User addUser(User user) {
        String hashedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        if (user.getUsername().equals("admin")) {
            user.setUserRole("ADMIN");
        }
        if (user.getUsername().equals("a")) {
            user.setUserRole("STUDENT");
        } else {
            user.setUserRole("TEACHER");
        }
        return userRepository.save(user);
    }

    public List<UserWOP> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserWOP> newList = new ArrayList<>();
        for (User user : users) {
            UserWOP newUser = new UserWOP(user);
            newList.add(newUser);
        }
        return newList;
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

    public String authenticate(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
        return user != null && bCryptPasswordEncoder.matches(password, user.getPassword())
                ? user.getUserRole() : null;
    }
}
