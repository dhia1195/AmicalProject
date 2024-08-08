import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('username') username: string
  ) {
    const newUser = await this.userService.signup(email, password, username);
    return { user: newUser };
  }

  @Post('signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const user = await this.userService.signin(email, password);
    if (user) {
      return { user };
    } else {
      return { message: 'Invalid email or password' };
    }
  }
}
