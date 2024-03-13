import _ from 'lodash';
import {parse} from 'papaparse';
import {Repository} from 'typeorm';

import {Show} from './entities/show.entity'
import {CreateShowDto} from './dto/show.dto'

import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Like} from 'typeorm'

import multer from 'multer'


@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>
  ){}
  //1-1. 새 공연 등록
  async create(file:Express.Multer.File, createShowDto:CreateShowDto) {
    const {name, category, intro, content, actors, price, firstShow, lastShow} = createShowDto
    if(!file.originalname.endsWith('.png'))
    throw new BadRequestException('PNG만 업로드 가능합니다.')

    const upload = multer({ dest: './photo' })
    const createdShowDto: Partial<CreateShowDto> = {
      name, category, intro, photos: String(file), content, actors, price, firstShow, lastShow
    }

    await this.showRepository.save(createdShowDto)
  }



  //2. 공연 목록 보기
  async findAll() {
    return this.showRepository.find({
      select: ['name', 'category', 'intro', 'price', 'firstShow', 'lastShow']
    })
  }

  //3. 키워드와 비슷한 공연 검색하기
  async findSimilar(name: string) {
    return this.showRepository.find({
      where: {
        name: Like(name)
      },
      select: ['name', 'category', 'intro', 'price', 'firstShow', 'lastShow']
    })
  }

  //4. 공연 상세보기
  async findOne(name: string) {
    return this.showRepository.findOne({
      where: {name}
    })
  }
  //5. 공연 삭제하기
  // remove(id: number) {

  // }
}
