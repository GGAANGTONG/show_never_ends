import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';
import {RolesGuard} from '../auth/roles.guard'

@UseGuards(RolesGuard)
@Controller('show/reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  reserve(@Body() reservationDto: ReservationDto) {
    return this.reservationService.reserve(reservationDto);
  }
  @Post()
  check(@Body() reservationDto: Partial<ReservationDto>) { const {email} = reservationDto
    return this.reservationService.check(email);
  }


}
