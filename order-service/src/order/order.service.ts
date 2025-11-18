import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  create(input: CreateOrderInput) {
    const entity = this.orderRepository.create({
      userId: input.userId,
      total: input.total,
      items: input.items ?? [],
      status: input.status ?? 'PENDING',
    });
    return this.orderRepository.save(entity);
  }

  findAll() {
    return this.orderRepository.find();
  }
}
