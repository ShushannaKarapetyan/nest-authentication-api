import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../users/schemas/user.schema';
import { SignUpDto } from '../dto/signup.dto';
import { hashPassword } from '../../utils/auth';
import * as _ from 'lodash';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<boolean> {
    const password = await hashPassword(signUpDto.password);

    // save user with hashed password
    const user = new this.userModel(_.assignIn(signUpDto, { password }));
    await user.save();

    return true;
  }
}
