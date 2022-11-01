package fuckingrullet.server.member.mapper;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-10-31T22:21:22+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberRegisterDtoToMember(MemberRegisterDto memberRegisterDto) {
        if ( memberRegisterDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( memberRegisterDto.getEmail() );
        member.setDisplayName( memberRegisterDto.getDisplayName() );
        member.setPassword( memberRegisterDto.getPassword() );

        return member;
    }
}
