package fuckingrullet.server.like.controller;

import fuckingrullet.server.domain.Likes;
import fuckingrullet.server.like.dto.LikesDto;
import fuckingrullet.server.like.mapper.LikeMapper;
import fuckingrullet.server.like.service.LikeService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Log4j2
public class LikeController {

    private final LikeService likeService;
    private final LikeMapper mapper;

    public LikeController(LikeService likeService, LikeMapper mapper) {
        this.likeService = likeService;
        this.mapper = mapper;
    }

    @PostMapping("/likes/post") // 질문 또는 답변에 담겨질 좋아요 기능 데이터를 생성합니다.
    public ResponseEntity postLike(@AuthenticationPrincipal String email) {
        Likes createData = likeService.createLikes(email);
        return ResponseEntity.status(HttpStatus.CREATED).body(createData);
    }

    @PostMapping("/likes/add")
    public ResponseEntity addLikes(@AuthenticationPrincipal String email,
                                   @Valid @RequestBody LikesDto.Post post) {
        Likes mapperData = mapper.likesPostDtoToLikes(post);
        Likes likes = likeService.editLikes(email, mapperData);
        return ResponseEntity.ok(likes);
    }
}
