package fuckingrullet.server.member.service;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberService {

    private MemberRepository memberRepository;

    public Member registerMember(Member member) {
        return null;
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private boolean existsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }
}
