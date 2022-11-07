package fuckingrullet.server.question.dto;

import fuckingrullet.server.domain.Question;
import lombok.Getter;
import lombok.Setter;


@Getter
public class QuestionPatchDto {
    @Setter
    private Long questionId;

    private String title;

    private String article;

    private Question.QuestionStatus questionStatus;
    private String tagName;
}
