package vaii_sp.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "instructor_id")
    @JsonIgnoreProperties("courses")
    private User instructor;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Assignment> assignments;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private Set<Feedback> feedbacks;

    @ManyToMany(mappedBy = "enrolledCourses")
    @JsonIgnore
    private Set<User> students;

    @JsonProperty("students")
    public Set<User> getStudentList() {
        return students;
    }

    public void removeRelationships() {
        for (Assignment assignment : assignments) {
            assignment.setCourse(null);
            assignments.remove(assignment);
        }
        for (Feedback feedback : feedbacks) {
            feedback.setCourse(null);
            feedbacks.remove(feedback);
        }
    }
}