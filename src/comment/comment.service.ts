import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  async findUserComment(userId: number) {
    return 'this is a comment of the user' + userId;
  }
}
