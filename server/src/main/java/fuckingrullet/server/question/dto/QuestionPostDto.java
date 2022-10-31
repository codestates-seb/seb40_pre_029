package fuckingrullet.server.question.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class QuestionPostDto {

    private Integer id;

    @NotBlank(message = "제목을 입력해야 합니다.")
    private String title;

    @NotBlank(message = "내용을 입력해야 합니다.")
    private String article;
}
