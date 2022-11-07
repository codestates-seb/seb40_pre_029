package fuckingrullet.server.answer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class AnswerPickDto {

    @Getter
    @NoArgsConstructor
    public static class Post {
        private Long answerId;
    }
}