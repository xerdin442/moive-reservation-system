import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AdminRole } from '@src/common/types/schema';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passcode: string;

  @Prop({ required: true })
  role: AdminRole;
}

export const AdminSchema = SchemaFactory.createForClass<Admin>(Admin);
