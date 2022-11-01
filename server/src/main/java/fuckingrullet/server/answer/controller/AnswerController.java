package fuckingrullet.server.answer.controller;

import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.answer.mapper.AnswerMapper;
import fuckingrullet.server.answer.service.AnswerService;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import fuckingrullet.server.question.service.QuestionService;
import org.mapstruct.Mapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

public class AnswerController {

    private AnswerService answerService;

    private AnswerMapper answerMapper;

    private QuestionService questionService;

    private MemberMapper memberMapper;

    private MemberService memberService;


    @PostMapping("/answer/post")
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto){
        Answer answer = answerService.createAnswer(
                Mapper.answerPostDtoToAnswer(questionService,memberService,answerPostDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponseDto(memberMapper,answer)), HttpStatus.CREATED);
    }
}
