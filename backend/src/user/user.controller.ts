import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';

@Controller('user')
export class MessageController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() creaUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
