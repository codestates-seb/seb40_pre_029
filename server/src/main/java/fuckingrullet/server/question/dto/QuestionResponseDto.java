package fuckingrullet.server.question.dto;

import fuckingrullet.server.domain.Question;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class QuestionResponseDto {
    private Long questionId;
    private Long memberId;
    private Long likeId;
    private String title;
    private String article;
    private String questionAuthor;
    private int views;
    /*private MemberRegisterDto member;*/
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    @Positive
    private int answern;
    private Question.QuestionStatus questionStatus;
}
