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

//    @OneToOne
//    @JoinColumn(name = "MEMBER_ID", nullable = false)
//    private Member member;

//    public void addMember(Member member){
//        this.member = member;
//    }

    @OneToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    public void addAnswer(Integer answern){
        this.answern = answern+1;
    }

//    public void deleteAnswer(Integer answern){
//        this.answern = answern-1;
//    }

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

//    @OneToOne
//    @JoinColumn(name = "RECOMMEND_ID", nullable = false)
//    private Recommends recommends;
//
//    @ManyToOne
//    @JoinColumn(name = "TAG_ID")
//    private Tag tag;
}
