package fuckingrullet.server.answer.mapper;

import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.answer.dto.AnswerResponseDto;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.member.service.MemberService;
import fuckingrullet.server.question.service.QuestionService;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    default Answer answerPostDtoToAnswer(QuestionService questionService, MemberService memberService, AnswerPostDto answerPostDto){
        Answer answer = new Answer();
        answer.setArticle(answerPostDto.getArticle());
        answer.setQuestion(questionService.findVerifiedQuestion(answerPostDto.getQuestionId()));// 게시글아이디 가져오기
        answer.setQuestion(questionService.plusAnswer(answerPostDto.getQuestionId()));

        return answer;
    }

    List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers);//리스트 추가
}
