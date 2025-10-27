import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @EventPattern('user_created')
  handleUserCreated(@Payload() data: any) {
    console.log('Received user_created event:', data.value);
  }
}
