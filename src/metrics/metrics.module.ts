import { Global, Module } from '@nestjs/common';
import { Registry } from 'prom-client';
import { Secrets } from '@src/common/secrets';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';

@Global()
@Module({
  controllers: [MetricsController],
  providers: [
    MetricsService,
    {
      provide: Registry,
      useFactory: () => {
        const registry = new Registry();
        registry.setDefaultLabels({ app: Secrets.APP_NAME });
        return registry;
      },
    },
  ],
  exports: [Registry, MetricsService],
})
export class MetricsModule {}
