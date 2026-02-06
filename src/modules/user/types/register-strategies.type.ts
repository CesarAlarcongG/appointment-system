import { GoogleRegisterStrategy } from '../strategies/google-register.strategy';
import { TraditionalRegisterStrategy } from '../strategies/traditional-register.strategy';

export type AllRegisterStrategies =
  | GoogleRegisterStrategy
  | TraditionalRegisterStrategy;
