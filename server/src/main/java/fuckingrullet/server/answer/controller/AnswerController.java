package fuckingrullet.server.answer.controller;

import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.answer.mapper.AnswerMapper;
import fuckingrullet.server.answer.service.AnswerService;
import fuckingrullet.server.domain.Answer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Valid @Slf4j
public class AnswerController {

    private AnswerService answerService;
    private AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping("/answer/post")
    public ResponseEntity postAnswer(@AuthenticationPrincipal String email,
                                     @Valid @RequestBody AnswerPostDto answerPostDto) {
        Answer answer = mapper.answerPostDtoToAnswer(answerPostDto);
        Answer createAnswer = answerService.createAnswer(email, answer);
        return ResponseEntity.ok(createAnswer);
    }

}
