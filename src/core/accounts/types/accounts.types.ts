export namespace IAccounts {
  export interface BaseModel {
    firstName: string;
    lastName: string | null;
    email: string;
    isVerifiedEmail: boolean;
    picture: string;
  }

  export interface Model extends BaseModel {
    _id: string;
    password: string;
    lastVisit: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }

  export type RawModel = Omit<Model, 'id'>;

  export namespace Enum {
    export enum Role {
      ADMIN = 'admin',
    }
  }
  //
  // export enum AuthMethods {
  //   Token = 'token',
  //   Password = 'password',
  // }
}
