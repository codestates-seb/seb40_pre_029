package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Getter @Setter
@Table(name = "ANSWER")
public class Answer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment
    @Column(name = "ANSWER_ID")
    private Long answerId;

    @Column(nullable = false, updatable = false) // 처음 작성후 작성자를 체크하기 위해 수정을 금지한다.
    private Long memberId;

    @Column(nullable = false, updatable = false) // 추천 기능은 변경할 수 없다.
    private Long likeId;

    @Column
    private Long likes;

    @Column(nullable = false)
    private String answerAuthor;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String article;

    @Column(nullable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

    private Boolean pick = false;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
}