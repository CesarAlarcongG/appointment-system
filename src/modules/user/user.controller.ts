import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { TraditionalRegisterService } from './services/traditional-register.service';
import { Token } from '../auth/dto/token.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly traditionalRegister: TraditionalRegisterService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<Token> {
    return await this.userService.registerUser<CreateUserDto>(
      createUserDto,
      this.traditionalRegister,
    );
  }
}
