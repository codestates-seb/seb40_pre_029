package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TAG_ID")
    private Long tagId;

    private String tagName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "STATUS")
    private TagStatus tagStatus = TagStatus.TAG_EXIST;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    public void addQuestion(Question question){
        this.question = question;
    }

    public enum TagStatus{
        TAG_NOT_EXIST("존재하지 않는 태그"),
        TAG_EXIST("존재하는 태그");

        @Getter
        private String status;

        TagStatus(String status){this.status = status;}
    }

}