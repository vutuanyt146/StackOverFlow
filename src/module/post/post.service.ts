import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from 'src/model/post.entity';
import { Tag } from '../../model/tag.entity';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  async create(postDto: PostDto) {
    let tagId;
    const isExistTag = await Tag.findOne({
      where: {
        name: postDto.tagName,
      },
    });

    if (!isExistTag) {
      const newTag = await Tag.create({
        name: postDto.tagName,
      });

      tagId = newTag.id;
    } else {
      tagId = isExistTag.id;
    }

    try {
      await Post.create({
        content: postDto.content,
        user_id: postDto.userId,
        tag_id: tagId,
      });
    } catch (error) {
      throw new HttpException('Error create new post!', HttpStatus.BAD_REQUEST);
    }

    return {
      status: 204,
      message: 'Create post successful!',
    };
  }

  async findAll(tagName: string) {
    if (!tagName) {
      return Post.findAll();
    }

    return this.findByTagName(tagName);
  }

  async findByTagName(tagName: string) {
    const tag = await Tag.findOne({
      include: [Post],
      where: {
        name: tagName,
      },
    });

    if (!tag) {
      throw new HttpException(
        'Your tagName is not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const posts = tag.posts.map((item) => {
      if (item.tag_id == tag.id) {
        return item;
      }
    });

    return posts;
  }

  async delete(id: number) {
    try {
      await Post.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Error delete the post!', HttpStatus.BAD_REQUEST);
    }

    return {
      status: 200,
      message: `Delete post with id = ${id} successful!`,
    };
  }
}
