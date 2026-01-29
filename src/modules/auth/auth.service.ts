import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
@Injectable()
export class AuthService {
  async excriptPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
}
