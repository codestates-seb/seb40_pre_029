package fuckingrullet.server.answer.repository;

import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    Optional<Answer> findByArticle(String article);

    Page<Answer> findAll(Pageable pageable);


    }
