package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Tag {

    @Id
    @Column(name = "TAG_ID")
    private String id;

    private String tag;

    @OneToMany(mappedBy = "tag")
    private List<Question> questions = new ArrayList<>();
}
