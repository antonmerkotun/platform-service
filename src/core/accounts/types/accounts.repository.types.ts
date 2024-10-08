import { IAccounts } from '.';
import { RecursivePartial } from '@/types';

export namespace IAccountsRepository {
  export namespace Create {
    export type Parameters = IAccounts.BaseModel;

    export type ReturnType = Promise<IAccounts.Model>;
  }

  export namespace GetMany {
    export type Parameters = { limit?: number; skip?: number };

    export type ReturnType = Promise<{
      accounts: IAccounts.Model[];
      total: number;
    }>;
  }

  export namespace GetOne {
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

  export namespace DeleteById {
    export type Parameters = { id: string };
  }
}
