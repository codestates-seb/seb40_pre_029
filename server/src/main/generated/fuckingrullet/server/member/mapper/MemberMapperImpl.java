package fuckingrullet.server.member.mapper;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-07T12:27:07+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberRegisterToMember(MemberRegisterDto register) {
        if ( register == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( register.getEmail() );
        member.setDisplayName( register.getDisplayName() );
        member.setPassword( register.getPassword() );

        return member;
    }

    @Override
    public Member memberPatchToMember(MemberDto.Patch memberDto) {
        if ( memberDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( memberDto.getMemberId() );
        member.setEmail( memberDto.getEmail() );
        member.setDisplayName( memberDto.getDisplayName() );
        member.setPassword( memberDto.getPassword() );
        member.setImage( memberDto.getImage() );

        return member;
    }

    @Override
    public MemberDto.Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.Response response = new MemberDto.Response();

        response.setEmail( member.getEmail() );
        response.setDisplayName( member.getDisplayName() );
        response.setImage( member.getImage() );
        List<String> list = member.getRoles();
        if ( list != null ) {
            response.setRoles( new ArrayList<String>( list ) );
        }

        return response;
    }

    @Override
    public List<MemberDto.Response> membersToMemberResponses(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberDto.Response> list = new ArrayList<MemberDto.Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponse( member ) );
        }

        return list;
    }
}
