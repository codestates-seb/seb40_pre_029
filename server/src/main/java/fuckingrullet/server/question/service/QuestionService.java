package fuckingrullet.server.question.service;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.domain.Question;
import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.member.repository.MemberRepository;
import fuckingrullet.server.question.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;

    public Question updateQuestion(String email ,Question question){

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
        Member member = findVerifiedMember(findMemberId(email));

        if(!findQuestion.getMemberId().equals(member.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_PATCH);
        }

        Optional.ofNullable(question.getModifiedAt())
                .ifPresent(findQuestion::setModifiedAt);
        Optional.ofNullable(question.getTitle())
                .ifPresent(findQuestion::setTitle);
        Optional.ofNullable(question.getArticle())
                .ifPresent(findQuestion::setArticle);
        Optional.ofNullable(question.getQuestionStatus())
                .ifPresent(findQuestion::setQuestionStatus);

        Question updateQuestion = questionRepository.save(findQuestion);
        return updateQuestion;
    }

    public Question createQuestion(String email ,Question question){
        verifyExistsTitle(question.getTitle());

        Member member = findVerifiedMember(findMemberId(email));
        log.info("member = {}", member.getEmail());
        log.info("member = {}", member.getDisplayName());
        log.info("member = {}", member.getMemberId());
        question.setMemberId(member.getMemberId());
        question.setQuestionAuthor(member.getDisplayName());

        return questionRepository.save(question);
    }

    public Question findQuestion(long questionId){
        Question findQuestion = findVerifiedQuestion(questionId);
        findQuestion.setViews(findQuestion.getViews()+1);
        questionRepository.save(findQuestion);

        return findQuestion;
    }

    public Question plusAnswer(long questionId){
        Question plusAnswer = findVerifiedQuestion(questionId);
        plusAnswer.setAnswern(plusAnswer.getAnswern()+1);
        questionRepository.save(plusAnswer);
        return plusAnswer;
    }

    public Page<Question> findQuestions(int page, int size, String sort){
        Page<Question> findAllQuestion = questionRepository.findAllByQuestionStatus(PageRequest.of(
                page,size, Sort.by(sort).descending()),Question.QuestionStatus.QUESTION_ACTIVE);
        VerifiedNoQuestion(findAllQuestion);
        return findAllQuestion;
    }

    private void verifyExistsTitle(String title){
        Optional<Question> question = questionRepository.findByTitle(title);
        if(question.isPresent()){
            throw new BusinessLogicException(ExceptionCode.QUESTION_EXISTS);
        }
    }

    public Question findVerifiedQuestion(long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

    private void VerifiedNoQuestion(Page<Question> findAllQuestion) {
        if(findAllQuestion.getTotalElements()==0){
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        }
    }

    public Page<Question> searchQuestions(String keyWord, int page, int size, String sort) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sort).descending());
        List<Question> searchResult = questionRepository.searchQuestionByKeyWord(keyWord);
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchResult.size());
        Page<Question> questions = new PageImpl<>(searchResult.subList(start, end),pageRequest, searchResult.size());
        VerifiedNoQuestion(questions);
        return questions;
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
