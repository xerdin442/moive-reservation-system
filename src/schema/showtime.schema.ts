import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Movie } from './movie.schema';

export type ShowTimeDocument = HydratedDocument<ShowTime>;

@Schema()
export class ShowTime {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Movie' })
  movie: Movie;

  @Prop({ required: true })
  screen: string;

  @Prop({ required: true })
  availableSeats: number;

  @Prop({ default: false })
  soldOut: boolean;
}

export const ShowTimeSchema = SchemaFactory.createForClass<ShowTime>(ShowTime);
