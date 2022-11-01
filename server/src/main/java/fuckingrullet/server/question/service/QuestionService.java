package fuckingrullet.server.question.service;

import fuckingrullet.server.domain.Question;
import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.question.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class QuestionService {
//    private final MemberService memberService;
    private final QuestionRepository questionRepository;

    public Question updateQuestion(Question question){

        Question findQuestion = findVerifiedQuestion(question.getQuestionId());

        Optional.ofNullable(question.getModifiedAt())
                .ifPresent(questionModifiedAt -> findQuestion.setModifiedAt(questionModifiedAt));
        Optional.ofNullable(question.getTitle())
                .ifPresent(questionTitle -> findQuestion.setTitle(questionTitle));
        Optional.ofNullable(question.getArticle())
                .ifPresent(questionArticle -> findQuestion.setArticle(questionArticle));

        Question updateQuestion = questionRepository.save(findQuestion);
        return updateQuestion;
    };

    public Question createQuestion(Question question){
        verifyExistsTitle(question.getTitle());
        return questionRepository.save(question);
    }

    public Question findQuestion(int questionId){
        Question findQuestion = findVerifiedQuestion(questionId);
        findQuestion.setViews(findQuestion.getViews()+1);
        questionRepository.save(findQuestion);

        return findQuestion;
    }

    public Page<Question> findQuestions(int page, int size, String sort){
        Page<Question> findAllQuestion = questionRepository.findAll(PageRequest.of(page,size, Sort.by(sort).descending()));
        VerifiedNoQuestion(findAllQuestion);
        return findAllQuestion;
    }

    private void verifyExistsTitle(String title){
        Optional<Question> question = questionRepository.findByTitle(title);
    }

    public Question findVerifiedQuestion(int questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

    public void deleteQuestion(int questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        questionRepository.delete(question);

    }


    public Page<Question> searchQuestion(String keyWord, int page, int size, String sort) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sort).descending());
        List<Question> searchResult = questionRepository.searchQuestionsByKeyWord(keyWord);
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchResult.size());
        Page<Question> questions = new PageImpl<>(searchResult.subList(start, end), pageRequest, searchResult.size());
        VerifiedNoQuestion(questions);

        return questions;
    }

    private void VerifiedNoQuestion(Page<Question> findAllQuestion) {
        if(findAllQuestion.getTotalElements()==0){
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        }
    }
}
