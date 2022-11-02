package fuckingrullet.server.question.dto;

import fuckingrullet.server.member.dto.MemberRegisterDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionResponseDto {
    private Integer questionId;
    private String title;
    private String article;
    private int views;
    /*private MemberRegisterDto member;*/
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;
}
