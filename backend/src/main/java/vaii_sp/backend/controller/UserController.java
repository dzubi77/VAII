package vaii_sp.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vaii_sp.backend.model.User;
import vaii_sp.backend.model.UserWOP;
import vaii_sp.backend.service.UserService;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserWOP addUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        return new UserWOP(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        if (!userService.authenticate(user.getUsername(), user.getPassword())) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Map<String, String> response = userService.response(user);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<UserWOP> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserWOP getUser(@PathVariable UUID id) {
        System.out.println("Received id: " + id);
        User user = userService.getUserById(id);
        return new UserWOP(user);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserWOP updateUser(@PathVariable UUID id, @RequestBody User user) {
        User updated = userService.updateUser(id, user);
        return new UserWOP(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

