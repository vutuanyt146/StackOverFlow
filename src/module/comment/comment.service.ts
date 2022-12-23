import { Injectable } from '@nestjs/common';
import { Comment } from '../../model/comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  async create(commentDto: CommentDto) {
    if (!!commentDto.commentId) {
      await Comment.create({
        content: commentDto.content,
        comment_id: commentDto.commentId,
        user_id: commentDto.userId,
        post_id: commentDto.postId,
      });

      await Comment.update(
        {
          chill_comments: commentDto,
        },
        {
          where: {
            comment_id: commentDto.commentId,
          },
        },
      );
    } else {
      await Comment.create({
        content: commentDto.content,
        user_id: commentDto.userId,
        post_id: commentDto.postId,
      });
    }

    return {
      status: 204,
      message: 'Successful create new comment!',
    };
  }

  async get(postId: number, commentId: number) {
    if (!!postId) {
      return this.getParentComments(postId);
    }

    if (!!commentId) {
      return this.getChildComments(commentId);
    }

    return Comment.findAll();
  }

  async getParentComments(postId: number) {
    const listComments: Comment[] = [];
    const parentComments = await Comment.findAll({
      where: {
        post_id: postId,
        comment_id: null,
      },
    });

    for (const parentComment of parentComments) {
      listComments.push(parentComment);
    }

    return listComments;
  }

  async getChildComments(commentId: number) {
    const arrComment: Comment[] = [];
    const childComments = await Comment.findAll({
      where: {
        comment_id: commentId,
      },
    });

    for (const childComment of childComments) {
      arrComment.push(childComment);
    }

    return arrComment;
  }
}
