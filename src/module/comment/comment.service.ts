import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  async Create(commentDto) {
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
      message: 'Successful!',
    };
  }

  async Get(post_id) {
    const listComments: any = [];
    const parentComments = await Comment.findAll({
      where: {
        post_id: post_id,
        comment_id: null,
      },
    });

    for (const parentComment of parentComments) {
      listComments.push(parentComment);
    }

    return listComments;
  }

  async GetChillComment(comment_id) {
    console.log('comment_id: ', comment_id);

    const arrComment: Comment[] = [];
    const chillComments = await Comment.findAll({
      where: {
        comment_id: comment_id,
      },
    });

    for (const chillComment of chillComments) {
      arrComment.push(chillComment);
    }

    return arrComment;
  }
}
