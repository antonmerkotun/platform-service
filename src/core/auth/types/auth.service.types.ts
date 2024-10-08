import { IOAuth } from '@/core/auth/types/oauth.types';
import { IAccounts } from '@/core/accounts/types';

export namespace IAuthService {
  export namespace GetMe {
    export type Parameters = {
      accountId: string;
    };

    export type ReturnType = Promise<IAccounts.Model>;
  }

  export namespace SignIn {
    export type Parameters = {
      clientRedirectUrl: string;
    };

    export type ReturnType = Promise<{ redirectUrl: string }>;
  }

  export namespace SignOut {
    export type Parameters = {
      refreshToken: string;
    };

    export type ReturnType = Promise<{ redirectUrl: string }>;
  }

  export namespace GenerateRedirectUrl {
    export type Params = {
      state: IOAuth.State;
    };

    export type ReturnType = Promise<{
      redirectUrl: string;
    }>;
  }

  export namespace HandleRedirect {
    export type Params = {
      code?: string;
      state: string;
    };

    export type ReturnType = Promise<{
      clientRedirectUrl: string;
      accessToken: string;
      refreshToken: string;
    }>;
  }

  export namespace _SendCallback {
    export type Body = {
      refreshToken: string;
      clientRedirectUrl: string;
      payload?: Record<string, string>;
    };

    export type Params = {
      callbackUrl: string;
      body: Body;
    };

    export type ApiResponse = {
      clientRedirectUrl: string;
    };

    export type ReturnType = Promise<ApiResponse>;
  }

  export namespace CreateAccessToken {
    export type Parameters = {
      accountId: string;
    };
  }

  export namespace CreateRefreshToken {
    export type Parameters = {
      accountId: string;
    };
  }

  export namespace CreateTokenPair {
    export type Parameters = {
      accountId: string;
    };

    export type ReturnType = {
      accessToken: string;
      refreshToken: string;
    };
  }
}
