import { Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('payments-queue')
export class CryptoProcessor {
  private readonly context: string = CryptoProcessor.name;
}
