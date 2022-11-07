package fuckingrullet.server.answer.controller;

import fuckingrullet.server.answer.dto.AnswerPatchDto;
import fuckingrullet.server.answer.dto.AnswerPickDto;
import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.answer.mapper.AnswerMapper;
import fuckingrullet.server.answer.service.AnswerService;
import fuckingrullet.server.domain.Answer;
import fuckingrullet.server.domain.Likes;
import fuckingrullet.server.domain.Member;
import fuckingrullet.server.like.service.LikeService;
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
    private LikeService likeService;

    /**
     * 답변 작성 API
     **/
    @PostMapping("/answer/post")
    public ResponseEntity postAnswer(@AuthenticationPrincipal String email,
                                     @Valid @RequestBody AnswerPostDto answerPostDto) {
        Likes likes = likeService.createLikes(email);
        Answer answer = answerService.createAnswer(email, likes,
                mapper.answerPostDtoToAnswer(questionService, memberService, answerPostDto));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.answerToAnswerResponseDto(answer)), HttpStatus.CREATED);
    }

    @PostMapping("/answer/pick")
    public ResponseEntity pickAnswer(@AuthenticationPrincipal String email,
                                     @Valid @RequestBody AnswerPickDto.Post post) {
        Answer answer = mapper.answerPickDtoToAnswer(post);
        Answer pickAnswer = answerService.pickAnswer(email, answer);
        return ResponseEntity.ok(pickAnswer);
    }

    @PatchMapping("/answer/patch")
    public ResponseEntity patchAnswer(@AuthenticationPrincipal String email,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto) {
        Answer answer = mapper.answerPatchDtoToAnswer(answerService, answerPatchDto);
        Answer updateAnswer = answerService.updateAnswer(email ,answer);
        return ResponseEntity.ok(mapper.answerToAnswerResponseDto(updateAnswer));
    }

    @DeleteMapping("/answer/delete")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") Long answerId) {
        answerService.deleteAnswer(answerId);
        return null;
    }
}
