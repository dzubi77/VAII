package vaii_sp.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vaii_sp.backend.model.User;
import vaii_sp.backend.service.UserService;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<String> login(@RequestBody User user) {
        if (userService.authenticate(user.getUsername(), user.getPassword()) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok().body(user.getUserRole());
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<UserWOP> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserWOP> getUser(@PathVariable UUID id) {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserWOP> updateUser(@PathVariable UUID id, @RequestBody User user) {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        return null;
    }
}
