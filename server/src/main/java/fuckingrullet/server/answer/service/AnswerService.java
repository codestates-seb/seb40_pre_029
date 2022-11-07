package fuckingrullet.server.answer.service;


import fuckingrullet.server.answer.repository.AnswerRepository;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Likes;
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
    private final QuestionService questionService;
    private final LikeRepository likeRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository, MemberRepository memberRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
    }

    public Answer createAnswer(String email, Likes likes, Answer answer){
        Member member = findVerifiedMember(findMemberId(email));
        answer.setAnswerAuthor(member.getDisplayName());
        answer.setMemberId(member.getMemberId());
        answer.setLikeId(likes.getLikeId());
        answer.setPick(false);
        answer.setLikes(likes.getLikes());
        return answerRepository.save(answer);
    }

    public Answer pickAnswer(String email, Answer answer) {
        Question findQuestion = questionService.findVerifiedQuestion(answer.getQuestion().getQuestionId()); // 질문 객체
        Member findMember = findVerifiedMember(findMemberId(email)); // 멤버 객체
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId()); // 답변 객체

        if(!findQuestion.getMemberId().equals(findMember.getMemberId())) { // 지금 api 호출자가 질문 작성자인가?
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_WRITER); // 아니면 에러 반환
        }

        if (findQuestion.getPick() || findAnswer.getPick()) { // 이미 채택됬는지 검증
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_PICK); // 채택이면 에러 반환
        }

        findAnswer.setPick(true); // 선택된 답변의 pick을 true로 변경
        Answer save = answerRepository.save(findAnswer);
        return save;
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

    public Likes findVerifiedLikes(Long likeId) {
        Optional<Likes> optionalLikes =
                likeRepository.findById(likeId);
        return optionalLikes.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));
    }

    public Likes findLike(long likeId){
        Likes findLike = findVerifiedLikes(likeId);
        return findLike;
    }

//    public Question findQuestion(long questionId){
//        Question findQuestion = findVerifiedQuestion(questionId);
//        findQuestion.setViews(findQuestion.getViews()+1);
//        findQuestion.setLikes(findLike(findQuestion.getLikeId()).getLikes());
//        questionRepository.save(findQuestion);
//
//        return findQuestion;
//    }

    public Answer findAnswer(long answerId){
        Answer findAnswer = findVerifiedAnswer(answerId);
        findAnswer.setLikeId(findLike(findAnswer.getLikeId()).getLikeId());
        findAnswer.setLikes(findLike(findAnswer.getLikeId()).getLikes());
        answerRepository.save(findAnswer);
        return findAnswer;
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
