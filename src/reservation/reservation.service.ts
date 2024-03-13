import { Injectable, UseGuards, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';

import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

import {Show} from '../show/entities/show.entity'
import {User} from '../user/entities/user.entity'
import {Reservation} from '../user/entities/reservation.entity'

import {RolesGuard} from '../auth/roles.guard';

import { ReservationDto } from './dto/reservation.dto';

// guard를 통해서 신원 인증함
@UseGuards(RolesGuard)
@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(User)
   private readonly userRepository:Repository<User>,
    @InjectRepository(Show)
    private readonly showRepository:Repository<Show>,
    @InjectRepository(Reservation)
    private readonly reservationRepository:Repository<Reservation>
    ){
    }
    //공연 예매 서비스

    // 인증되면 포인트를 확인함
    // 이메일(구매자 확인), (공연 이름) 필요
    // 포인트가 충분하면 구매, 부족하면 에러를 반환
    // 예약 정보 생성(구매자, 공연 이름, 공연되는 극장/좌석, 표 가격)
    // 트랜잭션 사용
  reserve({email, show}: ReservationDto) {
    const user = this.userRepository.findOneBy({email})

    if(!user)
    throw new UnauthorizedException('유저 정보가 존재하지 않습니다.')

    const theShow = this.showRepository.findOneBy({name: show})

    if(!theShow)
    throw new BadRequestException('예매하고자 하는 공연 정보를 입력해 주세요.')

    const payment = user.point - theShow.price
    if(!payment && payment !== 0)
    throw new InternalServerErrorException('알 수 없는 에러가 발생했습니다.')
    if(payment < 0) {
      throw new BadRequestException('포인트가 부족하여 공연을 예매할 수 없습니다.')
    }
    this.reservationRepository.create({
      user_email: user.email,
      user_nickname: user.nickname,
      show_name: theShow.name,
      theatre: theShow.theatre.name,
      seat: theShow.theatre.name.seat,
      price: theShow.price
    })
    
    this.userRepository.update({
      where:{
        email
      },
      {point: payment}
    })

    return {message: '선택하신 공연이 예매되었습니다.'}
  }

  check(email: Partial<ReservationDto>) {
    const reservation = this.reservationRespository.findOne({email})
    return reservation;
  }


}
