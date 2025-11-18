import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  private kafkaReady = false;

  constructor(
    private readonly orderService: OrderService,
    @Inject('ORDER_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}

  @Mutation(() => Order)
  async createOrder(@Args('input') input: CreateOrderInput) {
    if (!this.kafkaReady) {
      await this.kafkaClient.connect();
      this.kafkaReady = true;
    }

    const order = this.orderService.create(input);
    await this.kafkaClient.emit('order_created', order);
    return order;
  }

  @Query(() => [Order])
  orders() {
    return this.orderService.findAll();
  }
}
