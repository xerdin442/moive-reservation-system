import { UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import {
  WsException,
  BaseWsExceptionFilter,
  WebSocketGateway,
} from '@nestjs/websockets';

@UsePipes(
  new ValidationPipe({ exceptionFactory: (errors) => new WsException(errors) }),
)
@UseFilters(new BaseWsExceptionFilter())
@WebSocketGateway({ path: 'payments/transactions' })
export class PaymentsGateway {}
