package vaii_sp.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class UserWOP {
    private UUID userId;
    private String username;
    private String name;
    private String surname;
    private String userRole;
    private Set<Course> courses;
    private Set<Course> enrolledCourses;

    public UserWOP(User user) {
        this.userId = user.getUserId();
        this.username = user.getUsername();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.userRole = user.getUserRole();
        this.courses = user.getCourses();
        this.enrolledCourses = user.getEnrolledCourses();
    }
}
