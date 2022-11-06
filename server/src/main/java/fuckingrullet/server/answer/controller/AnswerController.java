package fuckingrullet.server.answer.controller;

import fuckingrullet.server.answer.dto.AnswerPatchDto;
import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.answer.mapper.AnswerMapper;
import fuckingrullet.server.answer.service.AnswerService;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import fuckingrullet.server.question.dto.SingleResponseDto;
import fuckingrullet.server.question.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@Validated
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AnswerController {

    private AnswerService answerService;
    private AnswerMapper mapper;
    private MemberService memberService;
    private MemberMapper memberMapper;
    private QuestionService questionService;

    /**
     * 답변 작성 API
     **/
    @PostMapping("/answer/post")
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto) {
        Answer answer = answerService.createAnswer(
                mapper.answerPostDtoToAnswer(questionService, memberService, answerPostDto));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.answerToAnswerResponseDto(answer)), HttpStatus.CREATED);
    }

    @PatchMapping("/answer/patch/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") Long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto) {
        answerPatchDto.setAnswerId(answerId);
        Answer answer = mapper.answerPatchDtoToAnswer(answerService, answerPatchDto);
        Answer updateAnswer = answerService.updateAnswer(answer);
        return ResponseEntity.ok(updateAnswer);
    }

    @DeleteMapping("/answer/delete/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") Long answerId) {
        answerService.deleteAnswer(answerId);
        return null;
    }
}
