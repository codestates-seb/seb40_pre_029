package fuckingrullet.server.question.dto;

import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter
@NoArgsConstructor
public class QuestionPatchDto {
    private Long questionId;
    private String title;
    private String article;
    private Long likeId;
    private Question.QuestionStatus questionStatus;
    private String tagName;
}
