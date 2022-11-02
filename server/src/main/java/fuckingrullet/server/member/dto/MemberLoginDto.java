package fuckingrullet.server.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class MemberLoginDto {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
