package fuckingrullet.server.like.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class LikesDto {

    @NoArgsConstructor
    @Getter @Setter
    public static class Post {

        private Long likeId;

        //@Size(max = 1) // 좋아요의 최대 값은 1을 넘을 수 없다.
        private Long likes;

        private List<Long> members;
    }
}
