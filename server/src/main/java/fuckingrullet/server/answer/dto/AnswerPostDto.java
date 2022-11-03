package fuckingrullet.server.answer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
@Getter
@NoArgsConstructor
public class AnswerPostDto {

    @NotBlank
    //@Pattern(regexp = "^(?=.*[A-Za-z0-9가-힣])[A-Za-z0-9가-힣]{2,100}$", message = "내용은 최소 2자 최대 100자 까지 허용됩니다.")
    private String article;

    private Long questionId; //postdto에 게시글아이디추가
}
