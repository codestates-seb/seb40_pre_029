package fuckingrullet.server.question.repository;

import fuckingrullet.server.domain.Question;
import fuckingrullet.server.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query(value = "select * from tag where question_id = :questionId",nativeQuery = true)
    List<Tag> findAllByQuestionId(@Param("questionId") long questionId);

    List<Tag> findAllByQuestionAndTagStatus(Question question, Tag.TagStatus tagStatus);
}
