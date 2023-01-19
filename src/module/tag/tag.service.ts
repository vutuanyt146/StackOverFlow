import { Injectable } from '@nestjs/common';
import { Question } from 'src/model/question.entity';
import { Tag } from 'src/model/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  async create(createTagDto: CreateTagDto) {
    return Tag.create({
      name: createTagDto.name,
    });
  }

  async findAll() {
    const tags = await Tag.findAll({ include: [Question] });
    const result: any = [];

    for (const tag of tags) {
      const numberOfQuestion = tag.questions.length;

      result.push({
        number: numberOfQuestion,
        name: tag.name,
      });
    }

    return result.sort((a, b) => b.number - a.number);
  }

  async findById(id: number) {
    return Tag.findOne({ where: { id }, include: [Question] });
  }

  async findByName(name: string) {
    return Tag.findOne({ where: { name }, include: [Question] });
  }

  async remove(id: number) {
    return Tag.destroy({ where: { id } });
  }

  async getOrCreateTagList(tags: string) {
    const tagNames = tags.split(', ');
    const tagList: Tag[] = [];

    for (const tagName of tagNames) {
      const isTagExist = await this.findByName(tagName);
      let tag: Tag = isTagExist;

      if (!isTagExist) {
        const tagCreate: CreateTagDto = new CreateTagDto();
        tagCreate.name = tagName;
        tag = await this.create(tagCreate);
      }

      tagList.push(tag);
    }

    return tagList;
  }
}
