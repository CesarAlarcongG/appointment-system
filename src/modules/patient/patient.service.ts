import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InfoPatientDto } from './dto/info-patient.dto';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entity/patient.entity';
import { Model, ObjectId, Types } from 'mongoose';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    private readonly userService: UserService,
  ) {}

  async createPatient(infoPatient: InfoPatientDto): Promise<void> {
    const isPatientCreate = await this.patientModel.findOne({
      userId: infoPatient.userId,
    });

    if (isPatientCreate)
      throw new ConflictException(
        'La información de paciente ya fue registrado para este ususario',
      );

    await this.userService.addInfoPatient(infoPatient);
    const patient: Patient | null = await this.patientModel.create({
      ...infoPatient,
      userId: new Types.ObjectId(infoPatient.userId),
    });

    if (!patient)
      throw new InternalServerErrorException(
        'No se pudo crear un nuevo documento de paciente',
      );
  }

  async updatePatient(
    userId: ObjectId,
    updatePatientDto: UpdatePatientDto,
  ): Promise<void> {
    const patientUpdate = await this.patientModel.findOneAndUpdate(
      {
        userId: userId,
      },
      { $set: { ...updatePatientDto } },
    );

    if (!patientUpdate)
      throw new NotFoundException('No se encontró al patient');
  }
}
