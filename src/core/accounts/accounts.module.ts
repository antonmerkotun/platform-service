import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Collections } from '@/static/mongo/collections';

import { AccountSchema } from '@/core/accounts/schemas';
import { AccountsRepository } from '@/core/accounts/accounts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collections.Accounts, schema: AccountSchema },
    ]),
  ],
  controllers: [],
  providers: [AccountsRepository],
  exports: [AccountsRepository],
})
export class AccountsModule {}
