import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        },
        consumer: {
          groupId: 'task-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Task service is running');
}
bootstrap();
