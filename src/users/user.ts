import { User } from 'src/utils/entities';
import { CreateUserParams, FindUserParams } from 'src/utils/types';

export interface IUserService {
  createUser(userParams: CreateUserParams): Promise<User>;
  findUser(FindUserParams: Partial<FindUserParams>): Promise<User>;
}
