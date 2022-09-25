import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/utils';
import { User } from 'src/utils/entities';
import { hashPassword } from 'src/utils/helpers';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IUserService } from './user';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}
  async createUser(userParams: CreateUserParams) {
    const existingUser = await this.user.findOneBy({ email: userParams.email });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const password = await hashPassword(userParams.password);
    const newUser = this.user.create({ ...userParams, password });
    return this.user.save(newUser);
  }
}
