package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import vaii_sp.backend.controller.UserWOP;
import vaii_sp.backend.model.User;
import vaii_sp.backend.repository.UserRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public User addUser(User user) {
        user.setPassword(this.hashPassword(user.getPassword()));
        if (user.getUsername().startsWith("@$")) { //TODO: fix assigning of roles
            user.setUserRole("TEACHER");
        } else {
            user.setUserRole("STUDENT");
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

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User updateUser(UUID id, User user) {
        User u = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(this.hashPassword(user.getPassword()));
        return userRepository.save(u);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
        return user != null && bCryptPasswordEncoder.matches(password, user.getPassword());
    }

    public String hashPassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    public Map<String, String> response(User user) {
        Map<String, String> response = new HashMap<>();
        var userFromDB = this.getUserByUsername(user.getUsername());
        response.put("userId", userFromDB.getUserId().toString());
        response.put("role", userFromDB.getUserRole());
        response.put("name", userFromDB.getName());
        response.put("surname", userFromDB.getSurname());
        return response;
    }
}

