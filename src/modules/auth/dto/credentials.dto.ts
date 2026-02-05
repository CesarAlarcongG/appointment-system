import { IsEmail, IsString } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
