package fuckingrullet.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "회원이 이미 존재합니다."),
    QUESTION_NOT_FOUND(404,"질문을 찾을 수 없습니다."),
    QUESTION_EXISTS(409,"질문이 이미 존재합니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
