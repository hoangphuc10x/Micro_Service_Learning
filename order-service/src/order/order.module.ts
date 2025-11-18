import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'ORDER_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order-service',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          producerOnlyMode: true,
        },
      },
    ]),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
