package fuckingrullet.server.member.mapper;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberDto;
import fuckingrullet.server.member.dto.MemberMyPageDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-02T17:05:10+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Azul Systems, Inc.)"
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
    public List<MemberDto.Response> membersToMemberResponses(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberDto.Response> list = new ArrayList<MemberDto.Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToResponse( member ) );
        }

        return list;
    }

    @Override
    public Member memberMyPageDtoToMember(MemberMyPageDto memberMyPageDto) {
        if ( memberMyPageDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( memberMyPageDto.getEmail() );
        member.setDisplayName( memberMyPageDto.getDisplayName() );
        member.setPassword( memberMyPageDto.getPassword() );
        member.setImage( memberMyPageDto.getImage() );

        return member;
    }

    protected MemberDto.Response memberToResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        List<String> roles = null;
        Long memberId = null;
        String email = null;
        String displayName = null;
        String image = null;

        List<String> list = member.getRoles();
        if ( list != null ) {
            roles = new ArrayList<String>( list );
        }
        memberId = member.getMemberId();
        email = member.getEmail();
        displayName = member.getDisplayName();
        image = member.getImage();

        MemberDto.Response response = new MemberDto.Response( memberId, email, displayName, image, roles );

        return response;
    }
}
