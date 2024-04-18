import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/entities/list.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/createListDto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
  ) {}

  async findAll() {
    return await this.listRepo.find();
  }

  async create(createListDto: CreateListDto) {
    const item = this.listRepo.create(createListDto);
    await this.listRepo.save(item);
    return item;
  }

  async remove(id: number) {
    console.log('service', id);
    return await this.listRepo.delete({ id });
  }
}
