import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUserService } from 'src/users/user';
import { Services } from 'src/utils';
import { compareHash } from 'src/utils/helpers';
import { ValidateUserDetails } from 'src/utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
  ) {}
  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userService.findUser({
      email: userDetails.email,
    });

    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    return compareHash(userDetails.password, user.password);
  }
}
