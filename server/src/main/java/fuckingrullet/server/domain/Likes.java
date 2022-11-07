package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Likes {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIKE_ID")
    private Long likeId;

    @Column(nullable = false)
    private Long likes;

    @Column
    private Long plusMinus;

    @ElementCollection
    private List<Long> members = new ArrayList<>();


}
