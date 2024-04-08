import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/createMessageDto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async findAll() {
    return await this.messageRepo.find();
  }

  async create(createMessageDto: CreateMessageDto) {
    const message = this.messageRepo.create(createMessageDto);
    await this.messageRepo.save(message);
    return message;
  }
}
