import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from '@/core/auth/auth.controller';
import { AuthService } from '@/core/auth/auth.service';
import { AccountsModule } from '@/core/accounts/accounts.module';
import { JwtModule } from '@nestjs/jwt';

@Module({})
export class AuthModule {
  static forRoot(jwtSecret: string, issKey: string): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        HttpModule,
        AccountsModule,
        JwtModule.register({
          secret: jwtSecret,
          signOptions: {
            issuer: issKey,
          },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    };
  }
}
