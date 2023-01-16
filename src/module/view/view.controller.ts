import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Post()
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewService.create(createViewDto);
  }

  @Get()
  findAll() {
    return this.viewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.viewService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewService.remove(+id);
  }
}
