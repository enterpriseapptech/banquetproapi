import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
// import { confirmFieldDecorator } from '../../validations/confirm_field.decorator';
export class CreateUserDto {
    @IsEmail()
    @Length(6, 100)
    email: string;

    @Length(2, 50)
    @IsNotEmpty()
    firstname: string;

    @Length(2, 50)
    @IsNotEmpty()
    lastname: string;

    @Length(2, 50)
    @Optional()
    businessname: string;

    @Length(10, 20)
    @IsNotEmpty()
    password: string;

    // @confirmFieldDecorator('password')
    // password_confirmation: string;

}
