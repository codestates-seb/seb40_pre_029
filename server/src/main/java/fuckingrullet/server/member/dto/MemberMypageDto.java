package fuckingrullet.server.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberMypageDto {

    private String email;
    private String displayName;
    private String password;
    private String image;
}
