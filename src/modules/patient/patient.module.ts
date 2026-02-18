import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { UserModule } from '../user/user.module';
import { Patient, PatientSchema } from './entity/patient.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    UserModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
