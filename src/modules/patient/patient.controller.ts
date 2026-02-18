import { Body, Controller, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { InfoPatientDto } from './dto/info-patient.dto';
import { RequiresRole } from 'src/decorators/requiere-rol/require-rol.decorator';
import { ERolUser } from '../user/enums/rol.enum';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @RequiresRole(ERolUser.MEDIC, ERolUser.ADMIN, ERolUser.WORKER)
  @Post('create')
  createPatient(@Body() infoPatientDto: InfoPatientDto): Promise<void> {
    return this.patientService.createPatient(infoPatientDto);
  }
}
