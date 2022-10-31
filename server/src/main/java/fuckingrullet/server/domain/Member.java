package fuckingrullet.server.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name = "MEMBERS")
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long memberId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String displayname;

    @Column(nullable = false)
    private String passwd;

    public Member(String displayname, String email, String passwd) {
        this.displayname = displayname;
        this.email = email;
        this.passwd = passwd;
    }

    @Column(nullable = false)
    private String image; // 옵션 :: 프로필 이미지 삽입

    @Column(nullable = false)
    private String role; // 옵션 :: 유저 등급 설정

    @OneToMany(mappedBy = "member")
    private List<Recommends> recommends = new ArrayList<>();
}
