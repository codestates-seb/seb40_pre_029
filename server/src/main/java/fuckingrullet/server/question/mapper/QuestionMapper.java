package fuckingrullet.server.question.mapper;


import fuckingrullet.server.domain.Question;
import fuckingrullet.server.question.dto.QuestionPatchDto;
import fuckingrullet.server.question.dto.QuestionPostDto;
import fuckingrullet.server.question.service.QuestionService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    default Question questionPostDtoToQuestion(/*MemberService memberService, */QuestionPostDto questionPostDto){
        Question question = new Question();

        question.setTitle(questionPostDto.getTitle());
        question.setArticle(questionPostDto.getArticle());
        question.setViews(0);
        question.getCreateAt();
        question.getModifiedAt();

        return question;

    }

    default Question questionPatchDtoToQuestion(QuestionService questionService, QuestionPatchDto questionPatchDto){
        Question question = new Question();
        question.setQuestionId(questionPatchDto.getQuestionId());
        question.setTitle(questionPatchDto.getTitle());
        question.setArticle(questionPatchDto.getArticle());

        return question;
    };
}
