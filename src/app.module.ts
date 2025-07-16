import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Secrets } from './common/secrets';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(Secrets.MONGO_URI),
    BullModule.forRoot({
      redis: {
        host: Secrets.REDIS_HOST,
        port: Secrets.REDIS_PORT,
        db: Secrets.QUEUE_STORE_INDEX,
        password: Secrets.REDIS_PASSWORD,
        family: 0,
      },
    }),
    ThrottlerModule.forRoot([
      {
        name: 'Seconds',
        ttl: 1000,
        limit: Secrets.RATE_LIMIT_PER_SECOND,
      },
      {
        name: 'Minutes',
        ttl: 60000,
        limit: Secrets.RATE_LIMIT_PER_MINUTE,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
