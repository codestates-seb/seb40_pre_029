package fuckingrullet.server.answer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnswerPostDto {

    private String article; // 답변 내용
    private Long questionId; // 질문글 아이디
}
