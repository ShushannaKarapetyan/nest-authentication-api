import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({ required: true, maxLength: 20 })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({ required: true, maxLength: 20 })
  lastName: string;

  @IsEmail()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  // regex for password to contain at least one uppercase, lowercase, number or special character
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number or special character.',
  })
  @ApiProperty({ required: true, minLength: 8, maxLength: 20 })
  password: string;
}
