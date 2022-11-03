package fuckingrullet.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class MemberDto {
    @AllArgsConstructor
    @Getter
    public static class Response {
        private Long memberId;
        private String email;
        private String displayName;
        private String image;
        private List<String> roles;
    }
}
