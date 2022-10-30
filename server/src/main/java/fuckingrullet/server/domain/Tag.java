package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Tag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TAG_ID")
    private Integer id;

    private String tag;

    @OneToMany(mappedBy = "tag")
    private List<Post> posts = new ArrayList<>();
}
