package fuckingrullet.server.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter @Setter
@NoArgsConstructor
public class MemberLoginDto {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
