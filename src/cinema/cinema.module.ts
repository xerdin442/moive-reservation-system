import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinema, CinemaSchema } from '@src/schema/cinema.schema';
import { Screen, ScreenSchema } from '@src/schema/screen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cinema.name, schema: CinemaSchema },
      { name: Screen.name, schema: ScreenSchema },
    ]),
  ],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
