import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ShowTime } from './showtime.schema';
import { TransactionMethod } from '@src/common/types/schema';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ShowTime',
  })
  showTime: ShowTime;

  @Prop({ required: true })
  numberOfTickets: number;

  @Prop({ type: [String], required: true })
  seatLabels: string[];

  @Prop({ required: true })
  paymentMethod: TransactionMethod;

  @Prop({ required: true })
  amount: number;
}

export const ReservationSchema =
  SchemaFactory.createForClass<Reservation>(Reservation);
