package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

    @Column(name = "RECOMMENT_ID")
    private Integer commentId;

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
