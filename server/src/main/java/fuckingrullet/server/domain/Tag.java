package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Tag {

    @Id
    @Column(name = "TAG_ID")
    private String tagId;

    private String tagName;

//    @OneToMany(mappedBy = "tag")
//    private List<Question> questions = new ArrayList<>();
}
