package fuckingrullet.server.question.repository;

import fuckingrullet.server.domain.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Optional<Question> findByTitle(String title);

    Page<Question> findAllByQuestionStatus(Pageable pageable, Question.QuestionStatus questionStatus);

    @Query(value = "select * from ((select * from question a\n" +
            "         where upper(a.article) like upper(concat('%',:keyWord,'%')) or upper(a.title) like upper(concat('%',:keyWord,'%'))))\n" +
            "         final_q where final_q.status = 'QUESTION_ACTIVE'",
            nativeQuery = true)
    List<Question> searchQuestionByKeyWord(@Param("keyWord") String keyWord);

    @Query(value = "select * from ((select * from question a\n" +
            "         where upper(question_tag) like upper(concat('%',:keyWord,'%'))))\n" +
            "         final_q where final_q.status = 'QUESTION_ACTIVE'",
            nativeQuery = true)
    List<Question> searchTagQuestionByKeyKeyWord(@Param("keyWord") String keyKeyWord);
}
