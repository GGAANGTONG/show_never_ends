import {IsEmail, Min, Max, IsNotEmpty, IsNumber, IsString, IsDate} from 'class-validator';

export class ReservationDto {
    @IsEmail()
    @IsNotEmpty({message: '이메일을 입력해 주세요'})
    email: string
    
    @IsString()
    @IsNotEmpty()
    show: string

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(100)
    seat: number

    @IsDate()
    @IsNotEmpty()
    date: Date
}
