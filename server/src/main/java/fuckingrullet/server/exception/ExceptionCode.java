package fuckingrullet.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "회원이 이미 존재합니다."),
    MEMBER_NOT_WRITER(400,"질문 작성자만 채택할 수 있습니다."),
    QUESTION_NOT_FOUND(404,"질문을 찾을 수 없습니다."),
    QUESTION_EXISTS(409,"질문이 이미 존재합니다."),
    QUESTION_NOT_PATCH(400,"질문 작성자가 아니라서 수정할 수 없습니다."),
    ANSWER_NOT_FOUND(404,"답글을 찾을 수 없습니다." ),
    ANSWER_NOT_PATCH(400,"답글 작성자가 아니라서 수정할 수 없습니다."),
    ANSWER_NOT_PICK(409,"이미 답변이 채택 된 질문글 입니다."),
    LIKE_NOT_FOUND(404, "추천 데이터를 찾을 수 없습니다."),
    LIKE_NOT_LIMIT(400, "추천의 최대 음수에 도달했습니다."),
    LIKE_NOT_ALLOW(409, "이미 추천 또는 비추천을 클릭했습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
