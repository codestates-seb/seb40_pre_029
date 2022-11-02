package fuckingrullet.server.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
public class MemberMyPageDto {

    @Email(message = "올바른 이메일 형식이 아닙니다.")
    @NotBlank
    private String email;

    @Pattern(regexp = "^(?=.*[A-Za-z0-9가-힣])[A-Za-z0-9가-힣]{2,10}$", message = "닉네임은 2자 이상 10자 이하 대소문자 영어와 한글 숫자로 구성할 수 있습니다.")
    private String displayName;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$", message = "비밀번호는 8자 이상 16자 이하 특수문자와 대소문자 영어및 숫자만 허용됩니다")
    private String password;

    @Pattern(regexp = "^.*\\.(png|jpg|jpeg|gif)$", message = "올바른 프로필 사진 확장자가 아닙니다(png, jpg, jpeg, gif)")
    private String image;
}
