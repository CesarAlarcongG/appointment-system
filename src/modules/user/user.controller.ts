import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Token } from '../auth/dto/token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<Token> {
    return await this.userService.registerUser<CreateUserDto>(
      createUserDto,
      'traditional',
    );
  }
}
