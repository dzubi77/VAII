package vaii_sp.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@RequiredArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Course {
    @Id
    private UUID id;
    private String courseName;
    private String courseDescription;
    private int studentCount;
    private int maxStudentCount;
}