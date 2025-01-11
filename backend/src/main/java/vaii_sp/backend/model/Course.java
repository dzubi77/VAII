package vaii_sp.backend.model;

import jakarta.persistence.*;
import lombok.*;
import vaii_sp.backend.controller.UserWOP;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "courses")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID courseId;

    private String courseName;
    private String courseDescription;
    private int studentCount = 0;
    private int maxStudentCount;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Assignment> assignments;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Feedback> feedbacks;

    @ManyToMany(mappedBy = "enrolledCourses")
    private Set<User> students;
}