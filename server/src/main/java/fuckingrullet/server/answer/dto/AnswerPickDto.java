package fuckingrullet.server.answer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnswerPickDto {

    public static class Post {
        private Long answerId;
        private Long questionId;
    }
}
