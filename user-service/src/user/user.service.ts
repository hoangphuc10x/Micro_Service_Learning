import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: Array<{ id: number } & CreateUserDto> = [];

  async create(dto: CreateUserDto) {
    const user = { id: this.users.length + 1, ...dto };
    await this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }
}
