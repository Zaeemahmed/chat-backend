import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils';
import { User } from 'src/utils/entities';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: Services.USER,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: Services.USER,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
