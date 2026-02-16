import { Inject, Injectable } from '@nestjs/common';
import { AllRegisterStrategies } from '../types/register-strategies.type';
import { UserRegisterStrategy } from '../interfaces/user-register-strategy.interface';

@Injectable()
export class RegisterFactory {
  constructor(
    @Inject('REGISTER_STRATEGIES')
    private readonly strategies: AllRegisterStrategies[],
  ) {}

  get<T>(provider: string): UserRegisterStrategy<T> {
    const strategy = this.strategies.find((s) => s.provider === provider);

    if (!strategy) {
      throw new Error('Provider no soportado');
    }

    return strategy as UserRegisterStrategy<T>;
  }
}
