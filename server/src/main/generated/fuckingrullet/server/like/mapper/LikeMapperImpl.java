package fuckingrullet.server.like.mapper;

import fuckingrullet.server.domain.Likes;
import fuckingrullet.server.like.dto.LikesDto;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-07T22:13:25+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class LikeMapperImpl implements LikeMapper {

    @Override
    public Likes likesPostDtoToLikes(LikesDto.Post post) {
        if ( post == null ) {
            return null;
        }

        Likes likes = new Likes();

        likes.setLikeId( post.getLikeId() );
        likes.setLikes( post.getLikes() );
        List<Long> list = post.getMembers();
        if ( list != null ) {
            likes.setMembers( new ArrayList<Long>( list ) );
        }

        return likes;
    }
}
