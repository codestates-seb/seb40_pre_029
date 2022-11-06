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

    @OneToOne
    @JoinColumn(name = "MEMBER_ID", nullable = true)
    private Member member;

    @Column(name = "RECOMMENT_ID")
    private Long recommentId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String article;

    @Column(nullable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();


    private Boolean pick;

    @OneToOne
    @JoinColumn(name = "RECOMMEND_ID", nullable = true)
    private Recommends recommends;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    }


