package fuckingrullet.server.answer.service;


import fuckingrullet.server.answer.dto.AnswerPatchDto;
import fuckingrullet.server.answer.repository.AnswerRepository;
import fuckingrullet.server.domain.Answer;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Setter
public class AnswerService {

    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer createAnswer(Answer answer){
        return answerRepository.save(answer);
    }


    public Answer updateAnswer(long answerId, AnswerPatchDto answerPatchDto) {
        Answer findAnswer = findVerifiedAnswer(answerId);//요청된 답이 DB에 없으면 에러

        Optional.ofNullable(answerPatchDto.getArticle()) //내용수정
                .ifPresent(findAnswer::setArticle);

        return findAnswer;
    }


    private Answer findVerifiedAnswer(long answerId) {
        return answerRepository.findById(answerId)
                .orElseThrow(() -> new IllegalArgumentException("해당 답변이 존재하지 않습니다."));
    }

}
