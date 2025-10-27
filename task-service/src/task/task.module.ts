import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskConsumer } from './task.consumer';

@Module({
  controllers: [TaskController, TaskConsumer],
  providers: [TaskService],
})
export class TaskModule {}
