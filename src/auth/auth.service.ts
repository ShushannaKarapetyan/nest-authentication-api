import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  private readonly saltOrRounds = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<object> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await this.comparePassword(password, user.password))) {
      const payload = { sub: user._id, email: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new BadRequestException('Invalid credentials.');
  }

  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    const hashPassword = await this.hashPassword(signUpDto.password);

    const user = new this.userModel(
      _.assignIn(signUpDto, { password: hashPassword }),
    );

    await user.save();

    return true;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltOrRounds);

    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}
