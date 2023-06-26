import { Injectable } from '@nestjs/common';

import { User } from './schemas/user.schema';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(
    email: string,
    exclude: string[] = [],
  ): Promise<User | null> {
    return this.userRepository.findByEmail(email, exclude);
  }
}
