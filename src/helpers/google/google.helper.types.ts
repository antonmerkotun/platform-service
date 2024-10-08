import { Credentials } from 'google-auth-library';

export namespace IGoogleBaseHelper {
  export namespace GetConsentPageUrl {
    export type Parameters = {
      state: string;
    };
  }

  export namespace GetTokens {
    export type Parameters = {
      code: string;
    };

    export type ReturnType = Promise<Credentials>;
  }
}
