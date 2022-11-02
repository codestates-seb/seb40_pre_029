package fuckingrullet.server.member.mapper;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberDto;
import fuckingrullet.server.member.dto.MemberMyPageDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberRegisterDtoToMember(MemberRegisterDto memberRegisterDto);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
    Member memberMyPageDtoToMember(MemberMyPageDto memberMyPageDto);
}
