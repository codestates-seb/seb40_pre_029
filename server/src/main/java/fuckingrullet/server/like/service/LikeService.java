package fuckingrullet.server.like.service;

import fuckingrullet.server.domain.Likes;
import fuckingrullet.server.domain.Member;
import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.like.repository.LikeRepository;
import fuckingrullet.server.member.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class LikeService {

    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;

    public LikeService(LikeRepository likeRepository, MemberRepository memberRepository) {
        this.likeRepository = likeRepository;
        this.memberRepository = memberRepository;
    }

    public Likes createLikes(String email) {
        Member member = findVerifiedMember(findMemberId(email));

        Likes likes = new Likes();
        likes.setLikes(0L);
        likes.setMembers(Collections.singletonList(member.getMemberId())); // 연동된 질문 또는 답변 작성자는 자추를 할수 없음.
        return likeRepository.save(likes);
    }

    @Transactional
    public Likes editLikes(String email, Likes likes) {

        Likes loadLikes = findVerifiedLikes(likes.getLikeId());
        Member member = findVerifiedMember(findMemberId(email));

        if(loadLikes.getMembers().contains(member.getMemberId())) { // 추천인이 질문또는 답변 작성자나 이미 추천을 하지 않았는지 체크
            throw new BusinessLogicException(ExceptionCode.LIKE_NOT_ALLOW);
        }

        if(loadLikes.getLikes() <= -30) throw new BusinessLogicException(ExceptionCode.LIKE_NOT_LIMIT) ;

        if(likes.getLikes() == 1) { // 값이 1일경우 추천 기능 구현
            likes.setLikeId(loadLikes.getLikeId());
            likes.setLikes(loadLikes.getLikes() + 1);

            List<Long> members = loadLikes.getMembers();
            members.add(member.getMemberId());

            likes.setMembers(members);
        }

        if(likes.getLikes() == 0) { // 값이 0일경우 비추천 기능 구현
            likes.setLikeId(loadLikes.getLikeId());
            likes.setLikes(loadLikes.getLikes() - 1);

            List<Long> members = loadLikes.getMembers();
            members.add(member.getMemberId());

            likes.setMembers(members);
        }

        likeRepository.save(likes);
        return likes;
    }

    @Transactional(readOnly = true)
    public Likes findVerifiedLikes(Long likeId) {
        Optional<Likes> optionalLikes =
                likeRepository.findById(likeId);
        return optionalLikes.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public Long findMemberId(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember.getMemberId();
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
