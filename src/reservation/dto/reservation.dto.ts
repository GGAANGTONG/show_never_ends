import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class ReservationDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    show: string
}
