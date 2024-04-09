import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { MCommentService } from '../services/MComment.service';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductComment } from '@/entities/ProductComment.entities';
import { Repository } from 'typeorm';

@Controller('/MComment')
export class MCommentController {
  constructor(
    private readonly mCommentService: MCommentService,
    @InjectRepository(ProductComment)
    private readonly commentRepository: Repository<ProductComment>,
  ) {}

  @Get('/list')
  async getCommentList(@Res() res: Response) {
    const list = await this.mCommentService.getCommentList();
    res.customerSend('获取评论成功', HttpStatus.OK, list);
  }

  @Post('/delete')
  async deleteComment(@Body() { id }: { id: number }, @Res() res: Response) {
    res.customerSend(
      '删除评论成功',
      HttpStatus.OK,
      await this.commentRepository.delete(id),
    );
  }
}
