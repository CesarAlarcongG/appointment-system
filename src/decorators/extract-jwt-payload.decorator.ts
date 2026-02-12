import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/modules/auth/interfaces/payload.jwt';

export const ExtractJwtPayload = createParamDecorator(
  (data: undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest<Request>();
    const payload = request.user as JwtPayload;

    return data
      ? new UnauthorizedException('No hay datos en el campo user del request')
      : payload;
  },
);
