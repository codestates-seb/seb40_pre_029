package fuckingrullet.server.auth.event;

import fuckingrullet.server.domain.Member;
import lombok.Getter;

@Getter
public class MemberRegistrationApplicationEvent {
    private final Member member;
    public MemberRegistrationApplicationEvent(Member member) {
        this.member = member;
    }
}
