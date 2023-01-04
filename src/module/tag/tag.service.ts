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

  async getOrCreateTag(tagName: string) {
    const isTagExist = await this.findByName(tagName);

    if (!isTagExist) {
      const tagCreate: CreateTagDto = new CreateTagDto();
      tagCreate.name = tagName;
      const tag = await this.create(tagCreate);
      return tag;
    }

    return isTagExist;
  }
}
