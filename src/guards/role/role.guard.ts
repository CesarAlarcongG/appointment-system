import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtPayload } from 'src/modules/auth/interfaces/payload.jwt';
import { ERolUser } from 'src/modules/user/enums/rol.enum';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolRequire: ERolUser[] = this.reflector.getAllAndOverride<ERolUser[]>(
      'require-rol',
      [context.getHandler(), context.getClass()],
    );

    if (!rolRequire) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest<Request>();
    const token: string | undefined = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('No tiene token');
    const tokenPayload: JwtPayload = this.jwtService.verify<JwtPayload>(token);

    const roles: ERolUser[] = tokenPayload.rol;

    const hasRole: boolean = roles.some((rol) => rolRequire.includes(rol));

    if (!hasRole)
      throw new UnauthorizedException(
        'No tiene los roles para ingresar a esta endpoint',
      );
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
