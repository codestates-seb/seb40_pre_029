package fuckingrullet.server.question.repository;

import fuckingrullet.server.domain.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    Optional<Question> findByTitle(String title);

    Page<Question> findAll(Pageable pageable);

    @Query(value = "select * from questions where upper(article) like upper(concat('%',keyWord,'%')) or upper(title) like upper(concat('%',keyWord,'%'))",
            nativeQuery = true)
    List<Question> searchQuestionsByKeyWord(@Param("keyWord") String keyWord);
}
