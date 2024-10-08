import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Collections } from '@/static/mongo/collections';

import { AccountDocument } from '@/core/accounts/schemas';
import { IAccountsRepository } from '@/core/accounts/types';

@Injectable()
export class AccountsRepository {
  constructor(
    @InjectModel(Collections.Accounts)
    private readonly _AccountModel: Model<AccountDocument>,
  ) {}

  public async create(
    data: IAccountsRepository.Create.Parameters,
  ): IAccountsRepository.Create.ReturnType {
    return this._AccountModel.create(data);
  }

  public async getMany(
    params: IAccountsRepository.GetMany.Parameters,
  ): IAccountsRepository.GetMany.ReturnType {
    const [accounts, total] = await Promise.all([
      this._AccountModel.find({}, undefined, params).lean(),
      this._AccountModel.countDocuments({}),
    ]);

    return { accounts, total };
  }

  public async getOne({
    _id,
    ...params
  }: IAccountsRepository.GetOne.Parameters): IAccountsRepository.GetOne.ReturnType {
    const findQuery: FilterQuery<AccountDocument> = params;

    if (_id) {
      findQuery._id = _id;
    }

    return this._AccountModel.findOne(findQuery).lean();
  }

  public async update({
    id,
    data,
  }: IAccountsRepository.Update.Parameters): IAccountsRepository.Update.ReturnType {
    return this._AccountModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .lean();
  }

  public async deleteById({ id }: IAccountsRepository.DeleteById.Parameters) {
    await this._AccountModel.findByIdAndDelete(id).lean();
  }
}
