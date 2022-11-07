package fuckingrullet.server.question.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class QuestionPostDto {

    private Long questionId;

    @NotBlank(message = "제목을 입력해야 합니다.")
    private String title;

    @Pattern(regexp = "^.{30,}$", message = "내용은 30자를 넘어야 합니다.")
    @NotBlank(message = "내용을 입력해야 합니다.")
    private String article;
    private String tagName;

}
