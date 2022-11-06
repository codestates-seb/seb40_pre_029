package fuckingrullet.server.answer.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import fuckingrullet.server.domain.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@JsonAutoDetect
public class AnswerPostDto {

    private String article; // 답변 내용
    private Question question; // 질문글 아이디
}
