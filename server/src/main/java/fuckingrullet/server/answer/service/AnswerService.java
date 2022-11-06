package fuckingrullet.server.answer.service;


import fuckingrullet.server.answer.repository.AnswerRepository;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Member;

import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.member.repository.MemberRepository;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Setter
public class AnswerService {

    private final AnswerRepository answerRepository;
    private MemberRepository memberRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer createAnswer(String email ,Answer answer){

        Member member = findVerifiedMember(findId(email));
        String displayName = member.getDisplayName();

        answer.setArticle(answer.getArticle()); // body 받은 내용을 Answer 저잘
        answer.setQuestion(answer.getQuestion()); // body 받은 질문글 아이디를 저장
        answer.setCreateAt(answer.getCreateAt()); // DATATIME 메서드 통해서 자동으로 생성시간 추가.
        answer.setModifiedAt(answer.getModifiedAt()); // DATATIME 메서드 통해서 자동으로 생성시간 추가.
        answer.setRecommentId(answer.getRecommentId()); // 추가 답변 기능 구현
        answer.setRecommends(answer.getRecommends()); //  추천 기능 구현

        answerRepository.save(answer);

        return answer;
    }

//    public Answer updateAnswer(long answerId, AnswerPatchDto answerPatchDto) {
//        Answer findAnswer = findVerifiedAnswer(answerId);//요청된 답이 DB에 없으면 에러
//
//        Optional.ofNullable(answerPatchDto.getArticle()) //내용수정
//                .ifPresent(findAnswer::setArticle);
//
//        return findAnswer;
//    }
//
//
//    private Answer findVerifiedAnswer(long answerId) {
//        return answerRepository.findById(answerId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 답변이 존재하지 않습니다."));
//    }
//
//    public Page<Answer> findAnswers(Question question, int answerPage, int answerSize, String answerSort) {
//        Page<Answer> findAllAnswer = answerRepository.findAllByQuestion(
//                PageRequest.of(answerPage-1,answerSize, Sort.by(answerSort).descending()),question);
//        return findAllAnswer;
//    }

    public Long findId(String email) {
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
