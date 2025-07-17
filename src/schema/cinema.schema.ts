import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CinemaDocument = HydratedDocument<Cinema>;

@Schema()
export class Cinema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  mfaSecret: string;

  @Prop({ required: true, unique: true })
  apiKey: string;

  @Prop({ default: false })
  usdcTransactions: boolean;

  @Prop()
  solWallet: string;

  @Prop()
  ethWallet: string;

  @Prop({ default: false })
  enableSubscriptions: boolean;

  @Prop({ required: true })
  acctNumber: string;

  @Prop({ required: true })
  acctName: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ default: 0 })
  balance: number;
}

export const CinemaSchema = SchemaFactory.createForClass<Cinema>(Cinema);
