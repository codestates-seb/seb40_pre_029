package fuckingrullet.server.question.controller;

import fuckingrullet.server.answer.mapper.AnswerMapper;
import fuckingrullet.server.answer.service.AnswerService;
import fuckingrullet.server.domain.Likes;
import fuckingrullet.server.domain.Question;
import fuckingrullet.server.like.service.LikeService;
import fuckingrullet.server.question.dto.MultiResponseDto;
import fuckingrullet.server.question.dto.QuestionPatchDto;
import fuckingrullet.server.question.dto.QuestionPostDto;
import fuckingrullet.server.question.dto.SingleResponseDto;
import fuckingrullet.server.question.mapper.QuestionMapper;
import fuckingrullet.server.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/api/auth")
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper mapper;
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final LikeService likeService;

    public QuestionController(QuestionService questionService, QuestionMapper mapper, /*MemberService memberService, MemberMapper memberMapper,*/
                              AnswerService answerService, AnswerMapper answerMapper, LikeService likeService){
        this.questionService = questionService;
        this.mapper = mapper;
        this.answerService = answerService;
        this.answerMapper = answerMapper;
        this.likeService = likeService;
    }

    @PostMapping("/question/post") // 맴버 제외
    public ResponseEntity postQuestion(@AuthenticationPrincipal String email,
                                       @Valid @RequestBody QuestionPostDto questionPostDto){
        Likes likes = likeService.createLikes(email);
        Question question = questionService.createQuestion(email, likes,mapper.questionPostDtoToQuestion(questionPostDto));
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(question)),HttpStatus.CREATED);
    }

    @PatchMapping("/question") // 로그인 제외
    public ResponseEntity patchQuestion(@AuthenticationPrincipal String email,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto){
        Question question = mapper.questionPatchDtoToQuestion(questionService, questionPatchDto);
        Question updateQuestion = questionService.updateQuestion(email, question);

        return new ResponseEntity<>(updateQuestion,HttpStatus.OK);
    }

    @GetMapping("/question") //수정필요(dto추가)
    public ResponseEntity getQuestions(@Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                       @Positive @RequestParam(value = "size", defaultValue = "5") int size,
                                       @RequestParam(value = "sort", defaultValue = "createAt") String sort){
        Page<Question> pageQuestions = questionService.findQuestions(page-1,size,sort);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionToQuestionResponseDtos(questions),pageQuestions), HttpStatus.OK);
    }

    @GetMapping("/question/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId,
                                      @Positive @RequestParam(value = "page", defaultValue = "1") int answerPage,
                                      @Positive @RequestParam(value = "size" , defaultValue = "50") int answerSize,
                                      @RequestParam(value = "sort", defaultValue = "createAt") String answerSort){
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionAndAnswerResponseDto(
                answerService, answerMapper,/*memberMapper,*/question,answerPage,answerSize,answerSort)),HttpStatus.OK);
    }

    @GetMapping("/question/search")
    public ResponseEntity getQuestions(@RequestParam("search") String keyWord, @Positive @RequestParam(value = "page",
            defaultValue = "1") int page, @Positive @RequestParam(value = "size",defaultValue = "5") int size,
                                       @RequestParam(value = "sort",defaultValue = "createAt") String sort) {
        Page<Question> searchResult = questionService.searchQuestions(keyWord,page-1,size,sort);
        List<Question> questions = searchResult.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionToQuestionResponseDtos(questions),
                searchResult),HttpStatus.OK);
    }

    @GetMapping("/tag/search")
    public ResponseEntity getTagQuestions(@RequestParam("search") String keyKeyWord, @Positive @RequestParam(value = "page",
            defaultValue = "1") int page, @Positive @RequestParam(value = "size",defaultValue = "5") int size,
                                          @RequestParam(value = "sort",defaultValue = "createAt") String sort) {
        Page<Question> searchResults = questionService.searchTagQuestions(keyKeyWord,page-1,size,sort);
        List<Question> tagQuestions = searchResults.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponseDtos(tagQuestions),
                searchResults),HttpStatus.OK);
    }

}
