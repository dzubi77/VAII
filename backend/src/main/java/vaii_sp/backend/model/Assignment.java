package vaii_sp.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "assignments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID assignmentId;

    private String title;
    private String description;
    private Date dueDate;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
