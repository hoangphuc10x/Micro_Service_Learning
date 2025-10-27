import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('USER_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    await this.kafkaClient.emit('user_created', user);
    console.log('📤 Sent event user_created:', user);
    return { message: 'User created event emitted', data: user };
  }
}
