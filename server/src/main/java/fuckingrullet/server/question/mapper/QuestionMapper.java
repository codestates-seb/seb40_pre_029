package fuckingrullet.server.question.mapper;


import fuckingrullet.server.domain.Question;
import fuckingrullet.server.question.dto.QuestionPostDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    default Question questionPostDtoToQuestion(/*MemberService memberService, */QuestionPostDto questionPostDto){
        Question question = new Question();

        question.setTitle(questionPostDto.getTitle());
        question.setArticle(questionPostDto.getArticle());

        return question;

    }
}
