import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '@src/schema/transaction.schema';
import { Reservation, ReservationSchema } from '@src/schema/reservation.schema';
import { BullModule } from '@nestjs/bull';
import { CryptoHelperService } from './crypto/helpers';
import { CryptoService } from './crypto/crypto.service';
import { FiatService } from './fiat/fiat.service';
import { PaymentsGateway } from './payments.gateway';
import { EthWeb3Provider, SolanaWeb3Provider } from './crypto/providers';
import { CryptoProcessor } from './crypto/crypto.processor';
import { FiatProcessor } from './fiat/fiat.processor';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    BullModule.registerQueue({
      name: 'payments-queue',
    }),
  ],
  providers: [
    CryptoService,
    FiatService,
    CryptoHelperService,
    PaymentsGateway,
    EthWeb3Provider,
    SolanaWeb3Provider,
    CryptoProcessor,
    FiatProcessor,
  ],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
