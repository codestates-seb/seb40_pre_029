package fuckingrullet.server.member.dto;

import lombok.*;

import javax.validation.constraints.*;

@Getter @Setter
@AllArgsConstructor
public class MemberRegisterDto {

    @Email
    @NotBlank(message = "이메일을 입력해야 합니다.")
    private String email;

    @Size(min = 2, max = 10)
    @NotBlank(message = "닉네임은 2자 이상 20자 이하로 설정하실 수 있습니다.")
    private String name;

    @Pattern(regexp = "^[a-zA-Z\\\\d`~!@#$%^&*()-_=+]$")
    @Size(min = 8, max = 16)
    @NotBlank(message = "비밀번호는 특수문자와 대소문자및 숫자만 허용됩니다.")
    private String passwd;

}
