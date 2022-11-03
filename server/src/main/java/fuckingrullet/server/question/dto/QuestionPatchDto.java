package fuckingrullet.server.question.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class QuestionPatchDto {
    private Long questionId;

    @NotBlank(message = "제목을 입력해야 합니다.")
    private String title;

    @NotBlank(message = "내용을 입력해야 합니다.")
    private String article;
}
