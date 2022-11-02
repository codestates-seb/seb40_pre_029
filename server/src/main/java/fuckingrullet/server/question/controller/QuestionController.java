package fuckingrullet.server.question.controller;

import fuckingrullet.server.answer.mapper.AnswerMapper;
import fuckingrullet.server.answer.service.AnswerService;
import fuckingrullet.server.domain.Question;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import fuckingrullet.server.question.dto.QuestionPatchDto;
import fuckingrullet.server.question.dto.QuestionPostDto;
import fuckingrullet.server.question.dto.SingleResponseDto;
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
import java.util.List;

@RestController
@Validated
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper, MemberService memberService, MemberMapper memberMapper,
                              AnswerService answerService, AnswerMapper answerMapper){
        this.questionService = questionService;
        this.mapper = mapper;
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.answerService = answerService;
        this.answerMapper = answerMapper;

    }

    @PostMapping("/question/post") // 맴버 제외
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){
        Question question = questionService.createQuestion(
                mapper.questionPostDtoToQuestion(memberService,questionPostDto));
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(memberMapper,question)),HttpStatus.CREATED);
    }

    @PatchMapping("/question/patch/{question-id}") // 로그인 제외
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive @NotNull Long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto){
        questionPatchDto.setQuestionId(questionId);
        Question question = mapper.questionPatchDtoToQuestion(questionService, /*memberService,*/ questionPatchDto);
        Question updateQuestion = questionService.updateQuestion(question);

        return new ResponseEntity<>(updateQuestion,HttpStatus.OK);

    }

    @GetMapping("/question") //수정필요(dto추가)
    public ResponseEntity getQuestions(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                       @Positive @RequestParam(value = "size", defaultValue = "5") int size,
                                       @RequestParam(value = "sort", defaultValue = "createAt") String sort){
        Page<Question> pageQuestions = questionService.findQuestions(page-1,size,sort);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(pageQuestions, HttpStatus.OK);
    }

    @GetMapping("/question/{question-id}") // 댓글 제외
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId,
                                      @Positive @RequestParam(value = "page", defaultValue = "1") int answerPage,
                                      @Positive @RequestParam(value = "size" , defaultValue = "5") int answerSize,
                                      @RequestParam(value = "sort", defaultValue = "createAt") String answerSort){
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionAndAnswerResponseDto(
                answerService, answerMapper,/*memberMapper,*/question,answerPage,answerSize,answerSort)),HttpStatus.OK);
    }

    @DeleteMapping("/question/delete/{question-id}") // 로그인 제외
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive int questionId){
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/question/search")
    public ResponseEntity getQuestions(@RequestParam("search") String keyWord,
                                       @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                       @Positive @RequestParam(value = "size", defaultValue = "5") int size,
                                       @RequestParam(value = "sort", defaultValue = "createAt") String sort){
        Page<Question> searchResult = questionService.searchQuestion(keyWord, page-1, size, sort);
        List<Question> questions = searchResult.getContent();

        return new ResponseEntity<>(searchResult,HttpStatus.OK);
    }


}
