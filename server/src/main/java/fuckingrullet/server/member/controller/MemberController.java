package fuckingrullet.server.member.controller;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberDto;
import fuckingrullet.server.member.dto.MemberListDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import fuckingrullet.server.member.dto.PageInfo;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping("/api/auth") // 표준 API 명세
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public MemberController(MemberService memberService, MemberMapper mapper, PasswordEncoder passwordEncoder) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원 가입 구현 -> 보안인증[O]
    @PostMapping("/register")
    public ResponseEntity registerMember(@Valid @RequestBody MemberRegisterDto register) {
        Member member = mapper.memberRegisterToMember(register);
        Member registerMember = memberService.registerMember(member);
        return ResponseEntity.ok(registerMember);
    }

    // 회원 로그인 구현 -> "/api/auth/login" 시큐리티 사용으로 인해 SecurityConfiguration 에서 구현 되었음.

    // 회원 로그아웃 구현 -> 보안인증[O] Optinal

    // 회원 내 정보 구현 -> 보안인증[O]
    @GetMapping("/member")
    public ResponseEntity getMember(@AuthenticationPrincipal String email) {
        Member member = memberService.findMember(email);
        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    // 회원 내 정보 수정 -> 보안인증[O]
    @PatchMapping("/member")
    public ResponseEntity patchMember(@AuthenticationPrincipal String email,
                                      @Valid @RequestBody MemberDto.Patch patch) {
        Member member = memberService.updateMember(email ,mapper.memberPatchToMember(patch));
        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    // 패스워드 검증 구현 -> 보안인증 [O]
    @PostMapping("/verify")
    public ResponseEntity getPassword(@AuthenticationPrincipal String email,
                                      @Valid @RequestBody Member member) {
        Member findMember = memberService.findPassword(email);

        if (passwordEncoder.matches(member.getPassword(), findMember.getPassword())) {
            return ResponseEntity.ok().build();
        }
        else
            return ResponseEntity.badRequest().build();
    }

    // 전체 회원 목록 구현 -> 보안인증[x] 필요하지 않음
    @PostMapping("/members")
    public ResponseEntity getMembers(@Valid @RequestBody PageInfo.Request request) {
        Page<Member> pageMembers = memberService.findAllMembers(request.getPage() - 1, request.getSize());
        List<Member> members = pageMembers.getContent();
        return ResponseEntity.ok(new MemberListDto<>(mapper.membersToMemberResponses(members),pageMembers));
    }

    // 회원 탈퇴 구현
    @DeleteMapping("/withdraw")
    public ResponseEntity deleteMember(@AuthenticationPrincipal String email,
                                       @Valid @RequestBody Member member) {
        Member findMember = memberService.findPassword(email);

        if (passwordEncoder.matches(member.getPassword(), findMember.getPassword())) {
            memberService.deleteMember(email);
            return ResponseEntity.ok().build();
        }
        else
            return ResponseEntity.badRequest().build();
    }
}
