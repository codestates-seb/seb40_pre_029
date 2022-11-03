package fuckingrullet.server.member.controller;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.exception.BusinessLogicException;
import fuckingrullet.server.exception.ExceptionCode;
import fuckingrullet.server.member.dto.MemberGetAllMemberDto;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 회원 가입 구현
    @PostMapping("/auth/register")
    public ResponseEntity<Member> registerMember(@Valid @RequestBody MemberRegisterDto memberRegisterDto) {
        Member member = mapper.memberRegisterDtoToMember(memberRegisterDto);
        Member registerMember = memberService.registerMember(member);
        return new ResponseEntity<>(registerMember, HttpStatus.CREATED);
    }

    // 회원 로그인 구현 -> 시큐리티 사용으로 인해 AppSecurityConfig 에서 구현 되었음.

    // 회원 로그아웃 구현 -> 작동 유무 체크
    @GetMapping("/auth/logout")
    public void logoutMember(HttpServletRequest request, HttpServletResponse response) throws IOException {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        response.sendRedirect("/");
    }

    // 회원 내정보 구현
    @GetMapping("/auth/member")
    public ResponseEntity findMember(@AuthenticationPrincipal Member member) {
        Optional<Member> find = Optional.ofNullable(memberService.findMember(member.getEmail())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)));
        return new ResponseEntity<>(find, HttpStatus.OK);
    }

    // 전체 회원 목록 구현
    @GetMapping("/auth/members")
    public ResponseEntity findAllMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findAllMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new MemberGetAllMemberDto<>(mapper.membersToMemberResponses(members),
                        pageMembers),
                HttpStatus.OK);
    }

}
