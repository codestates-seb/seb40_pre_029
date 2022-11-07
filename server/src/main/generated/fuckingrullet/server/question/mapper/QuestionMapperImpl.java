package fuckingrullet.server.question.mapper;

import fuckingrullet.server.domain.Question;
import fuckingrullet.server.question.dto.QuestionResponseDto;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-08T01:19:29+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public List<QuestionResponseDto> questionToQuestionResponseDtos(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<QuestionResponseDto> list = new ArrayList<QuestionResponseDto>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToQuestionResponseDto( question ) );
        }

        return list;
    }

    @Override
    public List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> tagQuestions) {
        if ( tagQuestions == null ) {
            return null;
        }

        List<QuestionResponseDto> list = new ArrayList<QuestionResponseDto>( tagQuestions.size() );
        for ( Question question : tagQuestions ) {
            list.add( questionToQuestionResponseDto( question ) );
        }

        return list;
    }

    protected QuestionResponseDto questionToQuestionResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDto questionResponseDto = new QuestionResponseDto();

        questionResponseDto.setQuestionId( question.getQuestionId() );
        questionResponseDto.setMemberId( question.getMemberId() );
        questionResponseDto.setLikeId( question.getLikeId() );
        questionResponseDto.setTitle( question.getTitle() );
        questionResponseDto.setArticle( question.getArticle() );
        questionResponseDto.setQuestionAuthor( question.getQuestionAuthor() );
        if ( question.getViews() != null ) {
            questionResponseDto.setViews( question.getViews() );
        }
        questionResponseDto.setCreateAt( question.getCreateAt() );
        questionResponseDto.setModifiedAt( question.getModifiedAt() );
        if ( question.getAnswern() != null ) {
            questionResponseDto.setAnswern( question.getAnswern() );
        }
        questionResponseDto.setQuestionStatus( question.getQuestionStatus() );
        questionResponseDto.setPick( question.getPick() );

        return questionResponseDto;
    }
}
