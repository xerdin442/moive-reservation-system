import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '@src/schema/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class CryptoService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}
}
