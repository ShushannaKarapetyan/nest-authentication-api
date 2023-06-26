import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto): Promise<object> {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() signUpDto: SignUpDto): Promise<boolean> {
    return this.authService.signUp(signUpDto);
  }
}
