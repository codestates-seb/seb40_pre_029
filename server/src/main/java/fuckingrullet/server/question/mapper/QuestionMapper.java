package fuckingrullet.server.question.mapper;


import fuckingrullet.server.domain.Member;
import fuckingrullet.server.domain.Question;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import fuckingrullet.server.question.dto.QuestionPatchDto;
import fuckingrullet.server.question.dto.QuestionPostDto;
import fuckingrullet.server.question.dto.QuestionResponseDto;
import fuckingrullet.server.question.service.QuestionService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    default Question questionPostDtoToQuestion(MemberService memberService, QuestionPostDto questionPostDto){
        Question question = new Question();

        question.setTitle(questionPostDto.getTitle());
        question.setArticle(questionPostDto.getArticle());
        question.setViews(0);
        question.getCreateAt();
        question.getModifiedAt();
        /*question.setMember(memberService.getLoginMember);*/

        return question;

    }

    default Question questionPatchDtoToQuestion(QuestionService questionService, QuestionPatchDto questionPatchDto){
        Question question = new Question();
        question.setQuestionId(questionPatchDto.getQuestionId());
        question.setTitle(questionPatchDto.getTitle());
        question.setArticle(questionPatchDto.getArticle());

        return question;
    }

    default QuestionResponseDto questionToQuestionResponseDto(MemberMapper memberMapper, Question question){
        QuestionResponseDto questionResponseDto = new QuestionResponseDto();
        questionResponseDto.setQuestionId(question.getQuestionId());
        questionResponseDto.setTitle(question.getTitle());
        questionResponseDto.setArticle(question.getArticle());
        questionResponseDto.setViews(question.getViews());
        questionResponseDto.setCreateAt(question.getCreateAt());
        questionResponseDto.setModifiedAt(question.getModifiedAt());

        Member member = question.getMember();
        /*questionResponseDto.setMember(memberMapper.memberRegisterDtoToMember(member));*/
        return questionResponseDto;
    }
}
