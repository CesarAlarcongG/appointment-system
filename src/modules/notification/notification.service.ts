import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetCode(email: string, code: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Recuperación de contraseña',
        template: './change-password',
        context: {
          code: code,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }
}
