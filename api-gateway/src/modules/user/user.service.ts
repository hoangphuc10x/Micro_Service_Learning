import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private readonly userServiceUrl =
    process.env.USER_SERVICE_URL || 'http://localhost:4001';

  constructor(private readonly http: HttpService) {}

  async createUser(dto: any) {
    const url = `${this.userServiceUrl}/user`;
    const { data } = await firstValueFrom(this.http.post(url, dto));
    return data;
  }
}
