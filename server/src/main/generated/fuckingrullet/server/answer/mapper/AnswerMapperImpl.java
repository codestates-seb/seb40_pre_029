package fuckingrullet.server.answer.mapper;

import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.domain.Answer;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-06T19:30:40+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto) {
        if ( answerPostDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setArticle( answerPostDto.getArticle() );
        answer.setQuestion( answerPostDto.getQuestion() );

        return answer;
    }
}
