import { Module } from '@nestjs/common';
import { Services } from 'src/utils';
import { UsersService } from './users.service';

@Module({
  providers: [{
    provide: Services.USER,
    useClass: UsersService
  }],
  exports: [{
    provide: Services.USER,
    useClass: UsersService
  }]
})
export class UsersModule {}
