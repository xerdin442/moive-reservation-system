import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cinema } from './cinema.schema';

export type ScreenDocument = HydratedDocument<Screen>;

@Schema()
export class Screen {
  @Prop({ required: true })
  identifier: string;

  @Prop({ required: true })
  numberOfSeats: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cinema' })
  cinema: Cinema;
}

export const ScreenSchema = SchemaFactory.createForClass<Screen>(Screen);
