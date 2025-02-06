package vaii_sp.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vaii_sp.backend.model.Course;
import vaii_sp.backend.model.Feedback;
import vaii_sp.backend.model.UserWOP;
import vaii_sp.backend.repository.CourseRepository;
import vaii_sp.backend.repository.FeedbackRepository;
import vaii_sp.backend.repository.UserRepository;

import java.util.List;
import java.util.UUID;

//TODO: form fields validation

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public Feedback addFeedback(UUID courseId, UUID authorId, String feedbackText) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Feedback feedback = new Feedback();
        feedback.setCourse(course);
        feedback.setAuthorId(authorId);
        feedback.setFeedbackText(feedbackText);
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbacksByCourse(UUID courseId) {
        return feedbackRepository.findByCourse_CourseId(courseId);
    }

    public void deleteFeedback(UUID feedbackId, UUID userId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        if (!feedback.getAuthorId().equals(userId)) {
            if (userRepository.existsById(userId)) {
                UserWOP user = new UserWOP(userRepository.findById(userId).get());
                if (user.getUserRole().equals("ADMIN")) {
                    feedbackRepository.delete(feedback);
                    return;
                } else {
                    throw new RuntimeException("Only authors and admins can delete feedback!");
                }
            }
        }
        feedbackRepository.delete(feedback);
    }
}
