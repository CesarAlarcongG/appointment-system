import { IsEmail, IsString } from 'class-validator';

export class ChangePassword {
  @IsString()
  code: string;
  @IsString()
  newPassword: string;
  @IsEmail()
  email: string;
}
