package fuckingrullet.server.member.mapper;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberLoginDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-01T23:17:52+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 16.0.1 (Oracle Corporation)"
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

    @Override
    public Member memberLoginDtoToMember(MemberLoginDto memberLoginDto) {
        if ( memberLoginDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( memberLoginDto.getEmail() );
        member.setPassword( memberLoginDto.getPassword() );

        return member;
    }
}
