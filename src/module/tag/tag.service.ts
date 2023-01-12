import { Injectable } from '@nestjs/common';
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
    return Tag.findAll();
  }

  async findById(id: number) {
    return Tag.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return Tag.findOne({ where: { name } });
  }

  async remove(id: number) {
    return Tag.destroy({ where: { id } });
  }

  async getOrCreateTagList(tags: string) {
    const tagNames = tags.split(', ');
    console.log(tagNames);
    
    const tagList: Tag[] = [];
    for (const tagName of tagNames) {
      const isTagExist = await this.findByName(tagName);

      if (!isTagExist) {
        const tagCreate: CreateTagDto = new CreateTagDto();
        tagCreate.name = tagName;
        const tag = await this.create(tagCreate);
        tagList.push(tag);
      }
    }
    

    return tagList;
  }
}
