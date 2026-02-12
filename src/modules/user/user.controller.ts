import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Token } from '../auth/dto/token.dto';
import { Public } from 'src/decorators/public.decorator';
import { UpdateDataDto } from './dto/update-data.dto';
import { ExtractJwtPayload } from 'src/decorators/extract-jwt-payload.decorator';
import type { JwtPayload } from '../auth/interfaces/payload.jwt';
import { ERolUser } from './enums/rol.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<Token> {
    return await this.userService.registerUser<CreateUserDto>(
      createUserDto,
      'traditional',
    );
  }

  //Endpoints privados
  @Patch('update-data')
  updateUserInformation(
    @Body() data: UpdateDataDto,
    @ExtractJwtPayload() jwt: JwtPayload,
  ) {
    return this.userService.updateUserData(jwt, data);
  }
}
