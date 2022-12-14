package fuckingrullet.server.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@NoArgsConstructor
public class MemberListDto<T> {
    private List<T> data;
    private PageInfo.Response pageInfo;

    public MemberListDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo.Response(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
