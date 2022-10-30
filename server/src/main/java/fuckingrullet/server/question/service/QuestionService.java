package fuckingrullet.server.question.service;

import fuckingrullet.server.domain.Question;
import fuckingrullet.server.question.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class QuestionService {
/*    private final MemberService memberService;*/
    private final QuestionRepository questionRepository;

    public Question createQuestion(Question question){
        verifyExistsTitle(question.getTitle());
        return questionRepository.save(question);
    }

    private void verifyExistsTitle(String title){
        Optional<Question> question = questionRepository.findByTitle(title);
    }
}
