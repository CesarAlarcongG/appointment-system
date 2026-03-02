import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Schedule {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;
}
