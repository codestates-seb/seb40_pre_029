package fuckingrullet.server.question.dto;

import fuckingrullet.server.domain.Question;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionAndAnswerResponseDto {

    private Long questionId;
    private String title;
    private String article;
    private Integer views;
    //private MultiResponseDto<AnswerResponseDto> answers;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    @Positive
    private Integer answern;

    private Question.QuestionStatus questionStatus;
}
