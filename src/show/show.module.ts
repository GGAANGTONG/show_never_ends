import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { Show } from './entities/show.entity'
import { ShowService } from './show.service';
import { ShowController } from './show.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
