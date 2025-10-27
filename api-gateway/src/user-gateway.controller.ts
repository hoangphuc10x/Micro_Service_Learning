// import { Controller, Get } from '@nestjs/common';
// import { Client, ClientKafka, Transport } from '@nestjs/microservices';

// @Controller('users')
// export class UserGatewayController {
//   @Client({
//     transport: Transport.KAFKA,
//     options: {
//       client: { brokers: ['localhost:9092'] },
//       consumer: { groupId: 'gateway-consumer' },
//     },
//   })
//   client: ClientKafka;

//   async onModuleInit() {
//     await this.client.connect();
//   }

//   @Get('create')
//   async createUser() {
//     const user = { id: Date.now(), name: 'Phúc from API Gateway' };
//     await this.client.emit('user_created', user);
//     return { message: 'User event emitted to Kafka', user };
//   }
// }
