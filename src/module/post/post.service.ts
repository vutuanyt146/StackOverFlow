import { Injectable } from '@nestjs/common';
import { Post } from 'src/module/post/post.entity';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class PostService {
  async create(postDto): Promise<string> {
    let tag_id;
    const isExistTag = await Tag.findOne({
      where: {
        name: postDto.tag_name,
      },
    });

    if (!isExistTag) {
      const newTag = await Tag.create({
        name: postDto.tag_name,
      });

      tag_id = newTag.id;
    } else {
      tag_id = isExistTag.id;
    }

    try {
      await Post.create({
        content: postDto.content,
        user_id: postDto.user_id,
        tag_id: tag_id,
      });
    } catch (error) {
      return 'Error create new post!';
    }

    return 'Create post successful!';
  }

  async findAll() {
    return Post.findAll();
  }

  async findByTagName(tag_name) {
    let tag_id;
    const tag = await Tag.findOne({
      where: {
        name: tag_name,
      },
    });

    if (tag) {
      tag_id = tag.id;
    }

    return await Post.findAll({
      where: {
        tag_id: tag_id,
      },
    });
  }

  async delete(id) {
    try {
      await Post.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return 'Error delete the post! ' + error;
    }

    return 'Delete post successful!';
  }
}
