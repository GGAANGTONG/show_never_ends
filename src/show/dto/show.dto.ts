import {IsEmail, IsNotEmpty, IsString, Matches, IsEnum, IsNumber, IsDate} from 'class-validator';

import {Category} from '../types/category.type'


export class CreateShowDto {
    @IsString()
    @IsNotEmpty({message: "등록할 공연의 이름을 입력해 주세요."})
    name: string;

    @IsEnum(Category)
    category: Category;

    @IsString()
    intro: string;

    @IsString()
    photos: string;

    @IsString()
    @IsNotEmpty({message: "등록할 공연의 정보를 입력해 주세요."})
    content: string;

    @IsString()
    @IsNotEmpty({message: "등록할 공연의 배우 정보를 입력해 주세요."})
    actors: string;

    @IsNumber()
    @IsNotEmpty({message: "등록할 공연의 표 가격을 입력해 주세요."})
    price: number;

    @IsDate()
    firstShow: Date;

    @IsDate()
    lastShow: Date;
}
