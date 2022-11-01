package fuckingrullet.server.answer.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class AnswerPatchDto {
    @Setter
    private String answerId;

    //답 수정
    private String article;

    //답 삭제
    private String answerStatus;

}
