import {Roles} from 'src/auth/roles.decorator'
import {RolesGuard} from 'src/auth/roles.guard'
import {Role} from 'src/user/types/userRole.type'



import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
import {CreateShowDto} from './dto/show.dto'

import { ShowService } from './show.service';

@UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}
//1-1. 새 공연 등록
  @Roles(Role.Admin)
  @Post('apply')
  @UseInterceptors(FileInterceptor('files'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createShowDto: CreateShowDto) {
    return this.showService.create(file, createShowDto);
  }

//2. 공연 목록 보기
  @Get('list')
  async findAll() {
    return this.showService.findAll();
  }

  //3. 키워드와 비슷한 공연 검색하기
  @Get('search/:name')
  async findSimilar(@Param('name') name: string) {
    return this.showService.findSimilar(name);
  }

  //4. 공연 상세보기
  @Get('detail/:name')
  async findOne(@Param('name') name: string) {
    return this.showService.findOne(name);
  }

  //6. 공연 삭제하기
//   @Delete(':id')
// //   remove(@Param('id') id: string) {
// //     return this.showService.remove(+id);
// //   }
}
