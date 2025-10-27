import { Injectable } from '@nestjs/common';

interface Task {
  id: number;
  userId: any;
  userName: any;
  description: string;
  createdAt: Date;
}

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  createTaskForUser(user: any) {
    const newTask = {
      id: this.tasks.length + 1,
      userId: user.id,
      userName: user.name,
      description: `Welcome task for ${user.name}`,
      createdAt: new Date(),
    };
    this.tasks.push(newTask);

    console.log('Created new task:', newTask);
    return newTask;
  }
}
