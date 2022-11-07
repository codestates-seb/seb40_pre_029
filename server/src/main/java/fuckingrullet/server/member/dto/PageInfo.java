package fuckingrullet.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PageInfo {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Request
    {
        private int page;
        private int size;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Response {

        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
    }
}
