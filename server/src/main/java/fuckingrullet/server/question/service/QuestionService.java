package fuckingrullet.server.question.service;

import fuckingrullet.server.domain.Question;
import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    //    private final MemberService memberService;
    private final QuestionRepository questionRepository;
    private final TagService tagService;

    public QuestionService(QuestionRepository questionRepository, TagService tagService) {
        this.questionRepository = questionRepository;
        this.tagService = tagService;
    }

    public Question updateQuestion(Question question){

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getModifiedAt())
                .ifPresent(findQuestion::setModifiedAt);
        Optional.ofNullable(question.getTitle())
                .ifPresent(findQuestion::setTitle);
        Optional.ofNullable(question.getArticle())
                .ifPresent(findQuestion::setArticle);
        Optional.ofNullable(question.getQuestionStatus())
                .ifPresent(findQuestion::setQuestionStatus);

        Question updateQuestion = questionRepository.save(findQuestion);

        if(!question.getTags().isEmpty()){
            tagService.deleteTags(question);
            tagService.createTags(question.getTags());
        }
        updateQuestion.setTags(tagService.findVerifiedTags(updateQuestion));
        return updateQuestion;
    }

    public Question createQuestion(Question question){
        verifyExistsTitle(question.getTitle());
        return questionRepository.save(question);
    }

    public Question findQuestion(long questionId){
        Question findQuestion = findVerifiedQuestion(questionId);
        findQuestion.setViews(findQuestion.getViews()+1);
        questionRepository.save(findQuestion);
        findQuestion.setTags(tagService.findVerifiedTags(findQuestion));

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
}