package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.repository.AssignmentRepository;

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
}
