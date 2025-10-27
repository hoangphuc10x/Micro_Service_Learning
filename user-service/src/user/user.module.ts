import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_KAFKA', // 👈 tên này phải trùng với @Inject('USER_KAFKA')
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-service',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          producerOnlyMode: true, // chỉ gửi event, không nhận
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
