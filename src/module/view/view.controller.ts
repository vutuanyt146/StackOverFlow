import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createViewDto: CreateViewDto, @Req() req) {
    return this.viewService.create(req.user.id, createViewDto);
  }

  @Get()
  findAll() {
    return this.viewService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.viewService.findById(+id);
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
