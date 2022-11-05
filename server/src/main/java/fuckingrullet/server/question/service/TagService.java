package fuckingrullet.server.question.service;

import fuckingrullet.server.domain.Question;
import fuckingrullet.server.domain.Tag;
import fuckingrullet.server.question.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {
    TagRepository tagRepository;
    public TagService(TagRepository tagRepository){
        this.tagRepository = tagRepository;
    }

    public void deleteTags(Question question){
        long questionId = question.getQuestionId();
        System.out.println("질문 Id"+questionId);

        List<Tag> tags = tagRepository.findAllByQuestionId(questionId);
        tags.stream().forEach(tag -> {System.out.println("삭제된 TagId"+tag.getTagId());
            tag.setTagStatus(Tag.TagStatus.TAG_NOT_EXIST);
        tagRepository.save(tag);});
    }
    public List<Tag> createTags(List<Tag> tags){
        return tags.stream().map(tag -> tagRepository.save(tag)).collect(Collectors.toList());
    }
    public List<Tag> findVerifiedTags(Question question) {
        List<Tag> findTags = tagRepository.findAllByQuestionAndTagStatus(question,
                Tag.TagStatus.TAG_EXIST);
        return findTags;
    }
}
