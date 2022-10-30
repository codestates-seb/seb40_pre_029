package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Integer id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String passwd;

    @OneToMany(mappedBy = "member")
    private List<Recommends> recommends = new ArrayList<>();
}
