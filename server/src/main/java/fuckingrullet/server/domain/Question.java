package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Question {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUESTION_ID")
    private Long questionId;

    @Column(nullable = false, updatable = false) // 처음 작성후 작성자를 체크하기 위해 수정을 금지한다.
    private Long memberId;

    @Column(nullable = false, updatable = false) // 추천 기능은 변경할 수 없다.
    private Long likeId;

    @Column(nullable = false)
    private String questionAuthor;

    @OneToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String article;

    @Column(nullable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column(nullable = false)
    private Integer views;

    @Column
    private Integer answern;

    @OneToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private QuestionStatus questionStatus = QuestionStatus.QUESTION_ACTIVE;

    public enum QuestionStatus{
        QUESTION_ACTIVE("활성화된 질문"),
        QUESTION_INACTIVE("비활성화된 질문");

        @Getter
        private String status;

        QuestionStatus(String status){this.status=status;}
    }

    @Column
    private String questionTag;

}