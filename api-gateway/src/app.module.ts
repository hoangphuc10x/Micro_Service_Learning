import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [HttpModule, UserModule, TaskModule],
})
export class AppModule {}
