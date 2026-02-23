import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { InfoPatientDto } from './dto/info-patient.dto';
import { RequiresRole } from 'src/decorators/requiere-rol/require-rol.decorator';
import { ERolUser } from '../user/enums/rol.enum';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import type { ObjectId } from 'mongoose';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @RequiresRole(ERolUser.MEDIC, ERolUser.ADMIN, ERolUser.WORKER)
  @Post('create/:userId')
  createPatient(
    @Body() infoPatientDto: InfoPatientDto,
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
  ): Promise<void> {
    return this.patientService.createPatient(userId, infoPatientDto);
  }

  @RequiresRole(ERolUser.MEDIC, ERolUser.ADMIN, ERolUser.WORKER)
  @Patch('update/:userId')
  update(
    @Body() updatePatientDto: UpdatePatientDto,
    @Param('userId', ParseObjectIdPipe) userId: ObjectId,
  ) {
    return this.patientService.updatePatient(userId, updatePatientDto);
  }
}
