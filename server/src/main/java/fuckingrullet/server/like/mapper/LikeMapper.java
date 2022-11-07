package fuckingrullet.server.like.mapper;

import fuckingrullet.server.domain.Likes;
import fuckingrullet.server.like.dto.LikesDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LikeMapper {
    Likes likesPostDtoToLikes(LikesDto.Post post);
}
