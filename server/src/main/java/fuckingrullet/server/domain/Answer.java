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

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ANSWER_ID")
    private Long answerId;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

    @Column(name = "RECOMMENT_ID")
    private Long recommentId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String article;

    @Column(nullable = false)
    private LocalDateTime createAt;

    @Column(nullable = false)
    private LocalDateTime modifiedAt;


    private Boolean pick;

    @OneToOne
    @JoinColumn(name = "RECOMMEND_ID", nullable = false)
    private Recommends recommends;
}
