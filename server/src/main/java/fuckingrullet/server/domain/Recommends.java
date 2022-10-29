package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Recommends {

    @Id @GeneratedValue
    @Column(name = "RECOMMEND_ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column(nullable = false)
    private Integer recommend;

    @Column(nullable = false)
    private Integer nonrecommend;
}
