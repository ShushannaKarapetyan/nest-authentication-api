import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { TokenPayload } from './types/token-payload.type';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import { IReadableUser } from '../users/interfaces/readable-user.interface';
import { userSensitiveFieldsEnum } from '../users/enums/protected-fields.enum';
import * as _ from 'lodash';

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
    @Body('_validated') validated: TokenPayload,
  ): Promise<IReadableUser> {
    const user = await this.usersService.findByEmail(validated.email);

    if (!user) {
      throw new UnauthorizedException('Not authorized.');
    }

    const readableUser = user.toObject() as IReadableUser;

    return _.omit<any>(
      readableUser,
      Object.values(userSensitiveFieldsEnum),
    ) as IReadableUser;
  }
}
