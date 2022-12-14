package fuckingrullet.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.List;

public class MemberDto {

    @NoArgsConstructor
    @Getter @Setter
    public static class Response {
        private String email;
        private String displayName;
        private String image;
        private List<String> roles;
    }

    @NoArgsConstructor
    @Getter @Setter
    public static class Patch {

        private Long memberId;

        @Email(message = "올바른 이메일 형식이 아닙니다.")
        private String email;

        @Pattern(regexp = "^(?=.*[A-Za-z0-9가-힣])[A-Za-z0-9가-힣]{2,10}$", message = "닉네임은 2자 이상 10자 이하 대소문자 영어와 한글 숫자로 구성할 수 있습니다.")
        private String displayName;

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@!%*#?&])[A-Za-z\\d$@!%*#?&]{8,16}$", message = "비밀번호는 8자 이상 16자 이하 특수문자와 대소문자 영어및 숫자만 허용됩니다")
        private String password;

        private String image;
    }
}
