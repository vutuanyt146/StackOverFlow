import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  async findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.tagService.findById(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
