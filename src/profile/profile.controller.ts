import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TokenPayloadInterface } from './interfaces/token-payload.interface';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: User,
    isArray: false,
    description: "Returns user's own data",
  })
  async me(
    @Body('_validated') validated: TokenPayloadInterface,
  ): Promise<User> {
    // exclude password and version from user's own data
    const user = await this.usersService.findByEmail(validated.email, [
      '-__v',
      '-password',
    ]);

    if (!user) {
      throw new UnauthorizedException('Not authorized.');
    }

    return user;
  }
}
