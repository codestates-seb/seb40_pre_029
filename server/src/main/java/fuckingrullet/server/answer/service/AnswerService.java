package fuckingrullet.server.answer.service;


import fuckingrullet.server.answer.repository.AnswerRepository;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Likes;
import fuckingrullet.server.domain.Member;
import fuckingrullet.server.domain.Question;

import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.like.repository.LikeRepository;
import fuckingrullet.server.member.repository.MemberRepository;
import fuckingrullet.server.question.repository.QuestionRepository;
import fuckingrullet.server.question.service.QuestionService;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Setter
@Log4j2
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    private final QuestionService questionService;
    private final LikeRepository likeRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository, MemberRepository memberRepository, QuestionService questionService, LikeRepository likeRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
        this.questionService = questionService;
        this.likeRepository = likeRepository;
    }

    public Answer createAnswer(String email, Likes likes, Answer answer){
        Member member = findVerifiedMember(findMemberId(email));
        answer.setAnswerAuthor(member.getDisplayName());
        answer.setMemberId(member.getMemberId());
        answer.setLikeId(likes.getLikeId());
        answer.setPick(false);
        return answerRepository.save(answer);
    }

    public Answer pickAnswer(String email, Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId()); // ?????? ??????
        log.info("findAnswer.getQuestion().getQuestionId() = {}", findAnswer.getQuestion().getQuestionId());
        Question findQuestion = questionService.findVerifiedQuestion(findAnswer.getQuestion().getQuestionId()); // ?????? ??????
        Member findMember = findVerifiedMember(findMemberId(email)); // ?????? ??????



        if(!findQuestion.getMemberId().equals(findMember.getMemberId())) { // ?????? api ???????????? ?????? ????????????????
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_WRITER); // ????????? ?????? ??????
        }

        if (findQuestion.getPick() || findAnswer.getPick()) { // ?????? ??????????????? ??????
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_PICK); // ???????????? ?????? ??????
        }

        findAnswer.setPick(true); // ????????? ????????? pick??? true??? ??????
        findQuestion.setPick(true); // ????????? ????????? pick??? true??? ??????
        questionRepository.save(findQuestion);
        Answer save = answerRepository.save(findAnswer);
        return save;
    }

    public Answer updateAnswer(String  email, Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());//????????? ?????? DB??? ????????? ??????
        Member member = findVerifiedMember(findMemberId(email));

        if(!findAnswer.getMemberId().equals(member.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_PATCH);
        }

        Optional.ofNullable(answer.getModifiedAt()) //????????????
                .ifPresent(findAnswer::setModifiedAt);
        Optional.ofNullable(answer.getArticle())
                .ifPresent(findAnswer::setArticle);
        Answer updateAnswer = answerRepository.save(findAnswer);

        return updateAnswer;
    }


    private Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new IllegalArgumentException("?????? ????????? ???????????? ????????????."));
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
