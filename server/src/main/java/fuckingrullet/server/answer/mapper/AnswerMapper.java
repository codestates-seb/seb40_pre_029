package fuckingrullet.server.answer.mapper;

import fuckingrullet.server.answer.dto.AnswerPostDto;
import fuckingrullet.server.domain.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
}
