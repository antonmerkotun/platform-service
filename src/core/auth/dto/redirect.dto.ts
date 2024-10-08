import { IsOptional, IsString } from 'class-validator';

export namespace RedirectDTO {
  export class Query {
    @IsOptional()
    @IsString()
    code?: string;

    @IsString()
    state: string;
  }
}
