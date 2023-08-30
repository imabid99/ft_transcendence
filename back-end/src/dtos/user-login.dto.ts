import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDataLogin {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
  }