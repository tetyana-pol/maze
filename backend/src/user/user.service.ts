import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly messageRepo: Repository<User>,
  ) {}

  async findAll() {
    return await this.messageRepo.find();
  }

  async create(createMessageDto: CreateUserDto) {
    const message = this.messageRepo.create(createMessageDto);
    await this.messageRepo.save(message);
    return message;
  }
}
