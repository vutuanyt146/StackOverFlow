import { Injectable } from '@nestjs/common';
import { Comment } from 'src/model/comment.entity';
import { User } from 'src/model/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  async create(user, createCommentDto: CreateCommentDto) {
    return Comment.create({
      content: createCommentDto.content,
      commentId: +(createCommentDto.commentId
        ? createCommentDto.commentId
        : null),
      userId: +user.id,
      postId: +createCommentDto.postId,
    });
  }

  async findAll() {
    return Comment.findAll({ include: [User] });
  }

  async findById(id: number) {
    return Comment.findOne({ where: { id }, include: [User] });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return Comment.update(
      {
        updateCommentDto,
      },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    return Comment.destroy({ where: { id } });
  }
}
