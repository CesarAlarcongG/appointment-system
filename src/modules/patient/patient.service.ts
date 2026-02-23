import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entity/patient.entity';
import { Model, ObjectId } from 'mongoose';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InfoPatientDto } from './dto/info-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    private readonly userService: UserService,
  ) {}

  async createPatient(
    userId: ObjectId,
    infoPatient: InfoPatientDto,
  ): Promise<void> {
    const isPatientCreate = await this.patientModel.findOne({
      userId: userId,
    });

    if (isPatientCreate)
      throw new ConflictException(
        'La información de paciente ya fue registrado para este ususario',
      );

    const user = await this.userService.findUserById(userId);

    const patient: Patient | null = await this.patientModel.create({
      ...infoPatient,
      userId: user._id,
      userInformation: {
        firtsName: user.firtsName,
        lastName: user.lastName,
      },
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
