import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IAccounts } from '@/core/accounts/types';

import { Collections } from '@/static/mongo/collections';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true, collection: Collections.Accounts })
export class Account implements IAccounts.Model {
  _id: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: Boolean })
  isVerifiedEmail: boolean;

  @Prop({ type: String })
  picture: string;

  @Prop({ required: false, select: false, default: null })
  password: string;

  @Prop({ type: Date, default: null })
  lastVisit: Date | null;

  createdAt: Date;

  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
