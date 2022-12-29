import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from 'src/model/post.entity';
import { Tag } from '../../model/tag.entity';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  async create(user, postDto: PostDto) {
    let tagId;
    let post;

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
      post = await Post.create({
        content: postDto.content,
        user_id: user.id,
        tag_id: tagId,
      });
    } catch (error) {
      throw new HttpException('Error create new post!', HttpStatus.BAD_REQUEST);
    }

    return {
      status: 201,
      message: 'Create post successful!',
      post: post,
    };
  }

  async findAll(tagName: string, id: number) {
    if (!!tagName) {
      return this.findByTagName(tagName);
    }

    if (!!id) {
      return this.findById(id);
    }

    return Post.findAll();
  }

  async findById(id: number) {
    return Post.findOne({
      where: {
        id: id,
      },
    });
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
