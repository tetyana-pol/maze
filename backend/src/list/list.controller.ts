import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/createListDto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Post()
  create(@Body() createMessageDto: CreateListDto) {
    return this.listService.create(createMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(Number(id));
  }
}
