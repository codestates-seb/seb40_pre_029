package fuckingrullet.server.answer.service;


import fuckingrullet.server.answer.repository.AnswerRepository;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Member;
import fuckingrullet.server.domain.Question;

import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.member.repository.MemberRepository;
import fuckingrullet.server.question.repository.QuestionRepository;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Setter
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository, MemberRepository memberRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
    }

    public Answer createAnswer(String email, Answer answer){
        Member member = findVerifiedMember(findMemberId(email));
        answer.setAnswerAuthor(member.getDisplayName());
        answer.setMemberId(member.getMemberId());
        return answerRepository.save(answer);
    }

    public Answer updateAnswer(String  email, Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());//요청된 답이 DB에 없으면 에러
        Member member = findVerifiedMember(findMemberId(email));

        if(!findAnswer.getMemberId().equals(member.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_PATCH);
        }

        Optional.ofNullable(answer.getModifiedAt()) //내용수정
                .ifPresent(findAnswer::setModifiedAt);
        Optional.ofNullable(answer.getArticle())
                .ifPresent(findAnswer::setArticle);
        Answer updateAnswer = answerRepository.save(findAnswer);

        return updateAnswer;
    }


    private Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new IllegalArgumentException("해당 답변이 존재하지 않습니다."));
        return findAnswer;
    }

    public Page<Answer> findAnswers(Question question, int answerPage, int answerSize, String answerSort) {
        Page<Answer> findAllAnswer = answerRepository.findAllByQuestion(
                PageRequest.of(answerPage-1,answerSize, Sort.by(answerSort).descending()),question);
        return findAllAnswer;
    }

    public void deleteAnswer(Long answerId) {
        Question question = answerRepository.findById(answerId).get().getQuestion();
        question.setAnswern(question.getAnswern()-1);
        questionRepository.save(question);
        answerRepository.deleteById(findAmswerId(answerId));
    }

    private Long findAmswerId(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer.getAnswerId();
    }

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
