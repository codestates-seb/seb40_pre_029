package fuckingrullet.server.question.controller;

import fuckingrullet.server.domain.Question;
import fuckingrullet.server.question.dto.QuestionPostDto;
import fuckingrullet.server.question.mapper.QuestionMapper;
import fuckingrullet.server.question.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/")
@Validated
@AllArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    /*private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final CommentService commentService;
    private final CommentMapper commentMapper;*/

    @PostMapping("/questions")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){
        Question question = questionService.createQuestion(
                mapper.questionPostDtoToQuestion(/*memberService,*/questionPostDto));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
