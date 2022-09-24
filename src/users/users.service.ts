import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils';
import { CreateUserParams } from 'src/utils/types';
import { IUserService } from './user';

@Injectable()
export class UsersService implements IUserService{
     createUser(userParams: CreateUserParams) {
         
     }
}
