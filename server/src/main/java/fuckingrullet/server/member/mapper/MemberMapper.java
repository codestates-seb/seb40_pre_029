package fuckingrullet.server.member.mapper;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    // Request Mapper
    Member memberRegisterToMember(MemberRegisterDto register);
    Member memberPatchToMember(MemberDto.Patch memberDto);

    // Response Mapper
    MemberDto.Response memberToMemberResponse(Member member);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}
