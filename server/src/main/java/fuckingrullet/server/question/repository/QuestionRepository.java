package fuckingrullet.server.question.repository;

import fuckingrullet.server.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    Optional<Question> findByTitle(String title);
}