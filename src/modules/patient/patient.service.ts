import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InfoPatientDto } from './dto/info-patient.dto';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entity/patient.entity';
import { Model } from 'mongoose';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    private readonly userService: UserService,
  ) {}

  async createPatient(infoPatient: InfoPatientDto): Promise<void> {
    await this.userService.addInfoPatient(infoPatient);
    const patient: Patient | null = await this.patientModel.create({
      ...infoPatient,
    });

    if (!patient)
      throw new InternalServerErrorException(
        'No se pudo crear un nuevo documento de paciente',
      );
  }
}
