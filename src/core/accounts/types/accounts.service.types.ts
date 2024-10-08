import { RecursivePartial } from '@/types';
import { IAccounts } from './accounts.types';

export namespace IAccountsService {
  export namespace Create {
    export type Parameters = IAccounts.BaseModel;

    export type ReturnType = Promise<IAccounts.Model>;
  }

  export namespace GetMany {
    export type Parameters = { limit?: number; skip?: number };

    export type ReturnType = Promise<{
      list: IAccounts.Model[];
      meta: {
        total: number;
      };
    }>;
  }

  export namespace Get {
    export type Parameters = Partial<IAccounts.Model>;

    export type ReturnType = Promise<IAccounts.Model>;
  }

  export namespace Update {
    export type Parameters = {
      id: string;
      data: RecursivePartial<IAccounts.RawModel>;
    };

    export type ReturnType = Promise<IAccounts.Model>;
  }

  export namespace Delete {
    export type Parameters = { id: string };
  }

  export namespace ResetPassword {
    export type Parameters = {
      userId: string;
    };

    export type ReturnType = Promise<{
      password: string;
    }>;
  }
}
