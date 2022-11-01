package fuckingrullet.server.answer.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
@Getter
public class AnswerPostDto {
    @Positive
    @NotNull
    private Long questionId;

    @NotBlank(message = "당신의 지식을 공유해 주세요~!")
    private String article;

}
