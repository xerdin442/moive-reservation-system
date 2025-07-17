import { Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('payments-queue')
export class FiatProcessor {
  private readonly context: string = FiatProcessor.name;
}
