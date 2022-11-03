package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Question {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "QUESTION_ID")
    private Long questionId;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID", nullable = true)
    private Member member;

    public void addMember(Member member){
        this.member = member;
    }

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

    @OneToOne
    @JoinColumn(name = "RECOMMEND_ID", nullable = true)
    private Recommends recommends;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;
}
