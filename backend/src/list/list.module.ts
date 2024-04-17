import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
