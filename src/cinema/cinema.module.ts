import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';

@Module({
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
