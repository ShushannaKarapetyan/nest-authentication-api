import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  firstName: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({ required: true, uniqueItems: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
