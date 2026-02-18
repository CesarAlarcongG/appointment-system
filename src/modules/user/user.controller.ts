import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Token } from '../auth/dto/token.dto';
import { Public } from 'src/decorators/public.decorator';
import { UpdateDataDto } from './dto/update-data.dto';
import { ExtractJwtPayload } from 'src/decorators/extract-jwt-payload.decorator';
import type { JwtPayload } from '../auth/interfaces/payload.jwt';
import { RequiresRole } from 'src/decorators/requiere-rol/require-rol.decorator';
import { ERolUser } from './enums/rol.enum';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import type { ObjectId } from 'mongoose';
import { ChangePassword } from './dto/change-password.dto';

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
  @RequiresRole(ERolUser.PATIENT, ERolUser.ADMIN)
  updateUserInformation(
    @Body() data: UpdateDataDto,
    @ExtractJwtPayload() jwt: JwtPayload,
  ) {
    return this.userService.updateUserData(jwt, data);
  }

  @Patch('suspend-account/:idUser')
  @RequiresRole(ERolUser.ADMIN)
  bloackAccount(@Param('idUser', ParseObjectIdPipe) idUser: ObjectId) {
    return this.userService.suspendUserAccount(idUser);
  }

  @Public()
  @Patch('change-password')
  async changePassword(@Body() changePassword: ChangePassword) {
    return await this.userService.changePassword(changePassword);
  }
}
