package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Answered {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ANSWERED_ID")
    private Long answeredId;

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
