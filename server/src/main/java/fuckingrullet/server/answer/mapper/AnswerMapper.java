package fuckingrullet.server.answer.mapper;

import fuckingrullet.server.answer.dto.AnswerPatchDto;
import fuckingrullet.server.answer.dto.AnswerPickDto;
import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.answer.dto.AnswerResponseDto;
import fuckingrullet.server.answer.service.AnswerService;
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
        answer.getCreateAt();
        answer.getModifiedAt();

        return answer;
    }

    Answer answerPickDtoToAnswer(AnswerPickDto.Post post);

    List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers);//리스트 추가

    default AnswerResponseDto answerToAnswerResponseDto(Answer answer){
        AnswerResponseDto answerResponseDto = new AnswerResponseDto();
        answerResponseDto.setAnswerId(answer.getAnswerId());
        answerResponseDto.setQuestionId(answer.getQuestion().getQuestionId());
        answerResponseDto.setArticle(answer.getArticle());
        answerResponseDto.setAnswerAuthor(answer.getAnswerAuthor());
        answerResponseDto.setMemberId(answer.getMemberId());
        answerResponseDto.setLikeId(answer.getLikeId());
        answerResponseDto.setCreateAt(answer.getCreateAt());
        answerResponseDto.setModifiedAt(answer.getModifiedAt());
        answerResponseDto.setLikes(answer.getLikes());

        return answerResponseDto;
    }

    default Answer answerPatchDtoToAnswer(AnswerService answerService, AnswerPatchDto answerPatchDto){
        Answer answer = new Answer();
        answer.setAnswerId(answerPatchDto.getAnswerId());
        answer.setArticle(answerPatchDto.getArticle());

        return answer;
    };
}
