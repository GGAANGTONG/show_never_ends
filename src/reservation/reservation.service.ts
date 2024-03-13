import { Injectable, UseGuards, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';

import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

import {Show} from '../show/entities/show.entity'
import {User} from '../user/entities/user.entity'
import {Reservation} from '../reservation/entities/reservation.entity'

import {RolesGuard} from '../auth/roles.guard';

import { ReservationDto } from './dto/reservation.dto';



// guard를 통해서 신원 인증함
@UseGuards(RolesGuard)
@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(User)
   private userRepository:Repository<User>,
    @InjectRepository(Show)
    private showRepository:Repository<Show>,
    @InjectRepository(Reservation)
    private reservationRepository:Repository<Reservation>,
    ){
    }

  async reserve({email, show, seat, date}: ReservationDto) {
    const user = await this.userRepository.findOne({where:{email}})

    if(!user)
    throw new UnauthorizedException('유저 정보가 존재하지 않습니다.')

    const theShow = await this.showRepository.findOne({where:{name: show}})

    if(!theShow)
    throw new BadRequestException('예매하고자 하는 공연 정보를 입력해 주세요.')

    const availableSeat = await this.reservationRepository.findOne({
      where:{
        show_name: show
      }
    })
    if(seat == availableSeat.seat) {
      throw new BadRequestException('해당 좌석은 이미 예약된 좌석입니다.')
    }

    const payment = user.point - theShow.price
    if(!payment && payment !== 0)
    throw new InternalServerErrorException('알 수 없는 에러가 발생했습니다.')
    if(payment < 0) {
      throw new BadRequestException('포인트가 부족하여 공연을 예매할 수 없습니다.')
    }
    await this.reservationRepository.create({
      user_email: user.email,
      user_nickname: user.nickname,
      show_name: theShow.name,
      theTheatre: theShow.theTheatre,
      seat,
      price: theShow.price,
      date
    })
    
    const data = {
      point: payment
    }
   await this.userRepository.update(
      {
        email
      },
     data)

    return {message: '선택하신 공연이 예매되었습니다.'}
  }

  async check(email: string) {
    const reservation = await this.reservationRepository.findOne({where: {user_email: email}})
    return reservation;
  }


}
