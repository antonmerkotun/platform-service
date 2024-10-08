import { CookieOptions, Response } from 'express';
import { DAYS_30 } from '@/static/jwt/jwt';

export class CookiesUtils {
  public static setTokens(
    accessToken: string,
    refreshToken: string,
    res: Response,
  ) {
    res.cookie('accessToken', accessToken, {
      // ...cookiesOptions,
      sameSite: 'lax',
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      // ...cookiesOptions,
      sameSite: 'lax',
      secure: false,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  // private static _getCookiesOptions(): CookieOptions {
  //   let cookiesOptions: CookieOptions = {};
  //
  //   switch (process.env.NODE_ENV) {
  //     case 'production': {
  //       cookiesOptions = {
  //         sameSite: 'strict',
  //         secure: true,
  //       };
  //       break;
  //     }
  //
  //     case 'staging': {
  //       cookiesOptions = {
  //         sameSite: 'none',
  //         secure: true,
  //       };
  //       break;
  //     }
  //
  //     case 'development': {
  //       cookiesOptions = {
  //         sameSite: 'lax',
  //         secure: false,
  //       };
  //       break;
  //     }
  //   }
  //
  //   return cookiesOptions;
  // }
}
