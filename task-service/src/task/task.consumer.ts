import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskService } from './task.service';

@Controller()
export class TaskConsumer {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern('user_created')
  async handleUserCreated(@Payload() message: any) {
    const user = message;
    console.log('📩 Received user_created event:', user);
    await this.taskService.createTaskForUser(user);
  }
}
