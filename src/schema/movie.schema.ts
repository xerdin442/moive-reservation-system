import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  MovieGenre,
  MovieRating,
  PremiereStatus,
} from '@src/common/types/schema';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  synopsis: string;

  @Prop({ required: true })
  poster: string;

  @Prop()
  trailer: string;

  @Prop({ required: true })
  releaseDate: string;

  @Prop({ required: true })
  genre: MovieGenre[];

  @Prop({ required: true })
  rating: MovieRating;

  @Prop()
  cast: [
    {
      name: string;
      image: string;
    },
  ];

  @Prop({ required: true })
  fiatTicketPrice: number;

  @Prop({ required: true })
  usdcTicketPrice: number;

  @Prop({ default: 0 })
  revenue: number;

  @Prop({ default: 'upcoming' })
  premiereStatus: PremiereStatus;
}

export const MovieSchema = SchemaFactory.createForClass<Movie>(Movie);
