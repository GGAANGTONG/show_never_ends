import {IsEmail, IsNotEmpty, IsString, Matches, IsEnum} from 'class-validator';

import {Category} from '../../show/types/category.type'


export class SignUpDto {
    @IsEmail()
    @IsNotEmpty({message: "이메일을 입력해 주세요."})
    email: string;

    @IsString()
    @IsNotEmpty({message: "비밀번호를 입력해주세요."})
    password: string;

    @IsString()
    @IsNotEmpty({message: "본인의 이름을 입력해 주세요."})
    name: string;

    @IsString()
    @IsNotEmpty({message: "사용할 닉네임을 입력해 주세요."})
    nickname: string;

    @IsString()
    @IsNotEmpty({message: "전화번호를 입력해 주세요."})
    @Matches(/^\d{3}-\d{3,4}-\d{4}$/)
    phone: string

    @IsEnum(Category)
    preference: Category;
}

export class SignInDto {
    @IsEmail()
    @IsNotEmpty({message: "이메일을 입력해 주세요."})
    email: string;

    @IsString()
    @IsNotEmpty({message: "비밀번호를 입력해주세요."})
    password: string;
}