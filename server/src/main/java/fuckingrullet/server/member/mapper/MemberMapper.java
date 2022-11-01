package fuckingrullet.server.member.mapper;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberLoginDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberRegisterDtoToMember(MemberRegisterDto memberRegisterDto);
    Member memberLoginDtoToMember(MemberLoginDto memberLoginDto);

}
