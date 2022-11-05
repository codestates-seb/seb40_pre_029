package fuckingrullet.server.question.mapper;


import fuckingrullet.server.answer.mapper.AnswerMapper;
import fuckingrullet.server.answer.service.AnswerService;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Question;
import fuckingrullet.server.domain.Tag;
import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.question.dto.*;
import fuckingrullet.server.question.service.QuestionService;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    default Question questionPostDtoToQuestion(QuestionPostDto questionPostDto){
        Question question = new Question();

        question.setTitle(questionPostDto.getTitle());
        question.setArticle(questionPostDto.getArticle());
        question.setViews(0);
        question.getCreateAt();
        question.getModifiedAt();
        question.setAnswern(0);
        /*question.setMember(memberService.getLoginMember);*/
        List<Tag> tags = tagsDtosToTags(questionPostDto.getTags(),question);
        question.setTags(tags);

        return question;

    }

    default List<Tag> tagsDtosToTags(List<TagDto> tagsDtos, Question question){
        return tagsDtos.stream().map(tagDto -> {
            Tag tag = new Tag();
            tag.addQuestion(question);
            tag.setTagName(tagDto.getTagName());
            return tag;
        }).collect(Collectors.toList());
    }

    default Question questionPatchDtoToQuestion(QuestionService questionService, QuestionPatchDto questionPatchDto){
        Question question = new Question();
        question.setQuestionId(questionPatchDto.getQuestionId());
        question.setTitle(questionPatchDto.getTitle());
        question.setArticle(questionPatchDto.getArticle());
        question.setQuestionStatus(questionPatchDto.getQuestionStatus());
        if(questionPatchDto.getTags()==null){
            questionPatchDto.setTags(new ArrayList<>());
        }
        List<Tag> tags = tagsDtosToTags(questionPatchDto.getTags(),question);
        question.setTags(tags);
        return question;
    }

    default QuestionResponseDto questionToQuestionResponseDto(Question question){
        QuestionResponseDto questionResponseDto = new QuestionResponseDto();
        questionResponseDto.setQuestionId(question.getQuestionId());
        questionResponseDto.setTitle(question.getTitle());
        questionResponseDto.setArticle(question.getArticle());
        questionResponseDto.setViews(question.getViews());
        questionResponseDto.setCreateAt(question.getCreateAt());
        questionResponseDto.setModifiedAt(question.getModifiedAt());
        questionResponseDto.setAnswern(question.getAnswern());
        questionResponseDto.setQuestionStatus(question.getQuestionStatus());

        List<Tag> tags = question.getTags();
        questionResponseDto.setTags(tagsToTagResponseDtos(
                question.getTags()
        ));

//        Member member = question.getMember();
        /*questionResponseDto.setMember(memberMapper.memberRegisterDtoToMember(member));*/
        return questionResponseDto;
    }

    default List<TagResponseDto> tagsToTagResponseDtos(
            List<Tag> tags){
        return tags.stream().map(tag -> TagResponseDto.
                builder().tagName(tag.getTagName()).build()).collect(Collectors.toList());
    }

    List<QuestionResponseDto> questionsToQuestionResponseDtos(List <Question> questions);

    default QuestionAndAnswerResponseDto questionToQuestionAndAnswerResponseDto(AnswerService answerService, AnswerMapper answerMapper,
                                                                                Question question, Integer answerPage, Integer answerSize, String answerSort){
        QuestionAndAnswerResponseDto questionAndAnswerResponseDto = new QuestionAndAnswerResponseDto();
        questionAndAnswerResponseDto.setQuestionId(question.getQuestionId());
        questionAndAnswerResponseDto.setTitle(question.getTitle());
        questionAndAnswerResponseDto.setArticle(question.getArticle());
        questionAndAnswerResponseDto.setViews(question.getViews());
        questionAndAnswerResponseDto.setCreateAt(question.getCreateAt());
        questionAndAnswerResponseDto.setModifiedAt(question.getModifiedAt());
        questionAndAnswerResponseDto.setAnswern(question.getAnswern());
        questionAndAnswerResponseDto.setQuestionStatus(question.getQuestionStatus());
        questionAndAnswerResponseDto.setTags(tagsToTagResponseDtos(question.getTags()));

        try{
            Page<Answer> pageAnswers = answerService.findAnswers(question,answerPage,answerSize,answerSort);
            List<Answer> answers = pageAnswers.getContent();
            questionAndAnswerResponseDto.setAnswers(new MultiResponseDto<>(answerMapper.answersToAnswerResponseDtos(answers),pageAnswers));
        }catch (BusinessLogicException e){}
        return questionAndAnswerResponseDto;
    }
}