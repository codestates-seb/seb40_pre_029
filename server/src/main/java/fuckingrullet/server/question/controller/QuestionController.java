package fuckingrullet.server.question.controller;

import fuckingrullet.server.domain.Question;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import fuckingrullet.server.question.dto.QuestionPatchDto;
import fuckingrullet.server.question.dto.QuestionPostDto;
import fuckingrullet.server.question.mapper.QuestionMapper;
import fuckingrullet.server.question.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/")
@Validated
@AllArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping("/question/post")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){
        Question question = questionService.createQuestion(
                mapper.questionPostDtoToQuestion(/*memberService,*/questionPostDto));
        return new ResponseEntity<>(question,HttpStatus.CREATED);
    }

//    @PatchMapping("/question/patch/{question-id}")
//    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive @NotNull long questionId, @Valid @RequestBody QuestionPatchDto questionPatchDto){
//        questionPatchDto.setQuestionId(questionId);
//        Question question = mapper.questionPostDtoToQuestion(questionService, memberService, questionPatchDto);
//
//    }

    @GetMapping("/questions") // 수정필요
    public ResponseEntity getQuestions(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                       @Positive @RequestParam(value = "size", defaultValue = "5") int size,
                                       @RequestParam(value = "sort", defaultValue = "title") String sort){
        Page<Question> pageQuestions = questionService.findQuestions(page-1,size,sort);

        return new ResponseEntity<>(pageQuestions, HttpStatus.OK);
    }

//    @GetMapping("questions/{question-id}")
//    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId,
//                                      @Positive)


}
