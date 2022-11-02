package fuckingrullet.server.member.controller;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberGetAllMemberDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 회원 가입
    @PostMapping("/auth/register")
    public ResponseEntity<Member> registerMember(@Valid @RequestBody MemberRegisterDto memberRegisterDto) {
        Member member = mapper.memberRegisterDtoToMember(memberRegisterDto);
        Member registerMember = memberService.registerMember(member);
        return new ResponseEntity<>(registerMember, HttpStatus.CREATED);
    }

    // 로그인 구현 -> 시큐리티 사용으로 인해 AppSecurityConfig 에서 구현 되었음.

    // 회원 목록
    @GetMapping("/auth/members")
    public ResponseEntity findMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findAllMember(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new MemberGetAllMemberDto<>(mapper.membersToMemberResponses(members),
                        pageMembers),
                HttpStatus.OK);
    }

}
