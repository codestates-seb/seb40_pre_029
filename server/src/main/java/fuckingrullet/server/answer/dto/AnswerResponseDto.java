package fuckingrullet.server.answer.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerResponseDto {
    private long answerId;
    private String article;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

}
