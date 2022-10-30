package fuckingrullet.server.member.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;

@Getter
@AllArgsConstructor
public class MemberRegisterDto {

    @Email(message = "올바른 이메일 형식이 아닙니다.")
    @NotBlank(message = "이메일을 입력해야 합니다.")
    private String email;

    @Length(min = 2, max = 10, message = "닉네임은 2자 이상 10자 이하로 지정할 수 있습니다.")
    @NotBlank(message = "닉네임을 입력해야 합니다.")
    private String displayName;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$", message = "비밀번호는 8자 이상 16자 이하 특수문자와 대소문자및 숫자만 허용됩니다")
    @NotBlank(message = "비밀번호를 입력해야 합니다.")
    private String password;
}
