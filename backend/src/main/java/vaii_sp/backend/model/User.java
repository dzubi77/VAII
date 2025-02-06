package vaii_sp.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID userId;

    private String name;
    private String surname;
    private String username;
    private String password;
    private String userRole;

    @OneToMany(mappedBy = "instructor")
    private Set<Course> courses;

    @ManyToMany
    @JoinTable(
            name = "student_courses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @JsonIgnore
    private Set<Course> enrolledCourses;

    public void assignCourse(Course course, boolean isStudent) {
        if (isStudent) {
            if (!enrolledCourses.contains(course)) {
                enrolledCourses.add(course);
                course.getStudents().add(this);
            }
        } else {
            courses.add(course);
        }
    }

    public void dropCourse(Course course) {
        if (enrolledCourses.remove(course)) {
            course.getStudents().remove(this);
        }
    }

    public void deleteAsInstructor(Course course) {
        courses.remove(course);
    }
}