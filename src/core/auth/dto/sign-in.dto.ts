import { IsString } from 'class-validator';

export namespace SignInDTO {
  export class Body {
    @IsString()
    clientRedirectUrl: string;

    @IsString()
    redirectCallbackUrl: string;
  }

  export type Response = Promise<{ redirectUrl: string }>;
}
