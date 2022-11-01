package fuckingrullet.server.answer.mapper;

import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.member.service.MemberService;
import fuckingrullet.server.question.service.QuestionService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    default Answer answerPostDtoToAnswer(QuestionService questionService, MemberService memberService, AnswerPostDto answerPostDto){
        Answer answer = new Answer();
        answer.setArticle(answerPostDto.getArticle());

        return answer;
    }
}
