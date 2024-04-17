import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './list/list.module';
import config from 'ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
