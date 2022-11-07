package fuckingrullet.server.answer.dto;

import fuckingrullet.server.domain.Question;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerResponseDto {
    private long answerId;
    private String article;
    private String answerAuthor;
    private Long memberId;
    private Long questionId;
    private Long likeId;

    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

}
