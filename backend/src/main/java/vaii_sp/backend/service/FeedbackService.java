package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.repository.FeedbackRepository;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
}
