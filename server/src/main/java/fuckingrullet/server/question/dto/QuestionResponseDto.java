package fuckingrullet.server.question.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionResponseDto {
    private Long questionId;
    private String title;
    private String article;
    private int views;
    /*private MemberRegisterDto member;*/
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    @Positive
    private int answern;
}
