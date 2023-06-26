import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { comparePassword } from '../utils/auth';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<object> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await comparePassword(password, user.password))) {
      const payload = { sub: user._id, email: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new BadRequestException('Invalid credentials.');
  }

  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    return this.authRepository.signUp(signUpDto);
  }
}
