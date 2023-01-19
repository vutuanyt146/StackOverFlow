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
      questionId: +createCommentDto.questionId,
    });
  }

  async findAll() {
    return Comment.findAll({ include: [User] });
  }

  async getByCommentId(commentId: number, questionId: number) {
    return Comment.findAll({
      where: { commentId, questionId },
      include: [User],
    });
  }

  async findById(id: number) {
    return Comment.findOne({ where: { id }, include: [User] });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return Comment.update(
      {
        content: updateCommentDto.content,
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
