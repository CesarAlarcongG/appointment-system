import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { InfoPatientDto } from './dto/info-patient.dto';
import { RequiresRole } from 'src/decorators/requiere-rol/require-rol.decorator';
import { ERolUser } from '../user/enums/rol.enum';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import type { Types } from 'mongoose';
import { Patient } from './entity/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @RequiresRole(ERolUser.MEDIC, ERolUser.ADMIN, ERolUser.WORKER)
  @Post('create/:userId')
  createPatient(
    @Body() infoPatientDto: InfoPatientDto,
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
  ): Promise<void> {
    return this.patientService.createPatient(userId, infoPatientDto);
  }

  @RequiresRole(ERolUser.MEDIC, ERolUser.ADMIN, ERolUser.WORKER)
  @Patch('update/:userId')
  update(
    @Body() updatePatientDto: UpdatePatientDto,
    @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
  ) {
    return this.patientService.updatePatient(userId, updatePatientDto);
  }

  @RequiresRole(ERolUser.MEDIC, ERolUser.WORKER)
  @Get(':patientId')
  async getPatient(
    @Param('patientId', ParseObjectIdPipe) patientId: Types.ObjectId,
  ): Promise<Patient> {
    return this.patientService.findPatientByUserId(patientId);
  }
}
