import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { decode } from 'jsonwebtoken';

import { ITokens } from '@/types';

export const AccountId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | null => {
    const req = ctx.switchToHttp().getRequest<Request>();

    const { accessToken } = req.cookies;
    if (!accessToken) return null;

    const { accountId } = decode(accessToken) as ITokens.Model;
    return accountId;
  },
);
