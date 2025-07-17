import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Reservation } from './reservation.schema';
import {
  Chain,
  TransactionMethod,
  TransactionStatus,
  TransactionType,
} from '@src/common/types/schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ required: true })
  amount: number;

  @Prop()
  txIdentifier: string;

  @Prop({ default: 0 })
  retries: number;

  @Prop({ required: true })
  method: TransactionMethod;

  @Prop({ required: true })
  chain: Chain;

  @Prop({ required: true })
  type: TransactionType;

  @Prop({ required: true })
  status: TransactionStatus;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Reservation',
  })
  reservation: Reservation;
}

export const TransactionSchema =
  SchemaFactory.createForClass<Transaction>(Transaction);
