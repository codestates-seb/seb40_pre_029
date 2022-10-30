package fuckingrullet.server.member.controller;

import fuckingrullet.server.domain.Member;
import fuckingrullet.server.member.dto.MemberRegisterDto;
import fuckingrullet.server.member.mapper.MemberMapper;
import fuckingrullet.server.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/register")
    public ResponseEntity registerMember(@Valid @RequestBody MemberRegisterDto memberRegisterDto) {
        Member member = mapper.memberRegisterDtoToMember(memberRegisterDto);
        Member registerMember = memberService.registerMember(member);
        System.out.println(member);
        return new ResponseEntity<>(registerMember, HttpStatus.CREATED);
    }
}
