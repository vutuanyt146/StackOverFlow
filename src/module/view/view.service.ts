import { Injectable } from '@nestjs/common';
import { View } from 'src/model/view.entity';
import { CreateViewDto } from './dto/create-view.dto';

@Injectable()
export class ViewService {
  async create(userId: number, createViewDto: CreateViewDto) {
    return View.create({
      userId,
      questionId: createViewDto.questionId,
    });
  }

  async findAll() {
    return View.findAll();
  }

  async findById(id: number) {
    return `This action returns a #${id} view`;
  }

  async update(id: number) {
    return View.update(
      {
        id,
      },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    return `This action removes a #${id} view`;
  }
}
