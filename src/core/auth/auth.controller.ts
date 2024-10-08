import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@/core/auth/auth.service';
import { SignInDTO, SignOutDTO } from '@/core/auth/dto';
import { RedirectDTO } from '@/core/auth/dto/redirect.dto';
import { AccountId } from '@/decorators';
import { CookiesUtils } from '@/utils/cookies';

@Controller('auth')
export class AuthController {
  constructor(private readonly _AuthService: AuthService) {}

  @Get('me')
  async getMe(@AccountId() accountId: string) {
    if (!accountId) throw new UnauthorizedException('User not authenticated');

    return await this._AuthService.getMe({ accountId });
  }

  @Post('sign-in')
  public async signIn(@Body() body: SignInDTO.Body): SignInDTO.Response {
    return this._AuthService.SignIn({ state: body });
  }

  @Post('sign-out')
  public async signOut(
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignOutDTO.Response> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { success: true };
  }

  @Get('google-oauth/v2/redirect/url')
  async handleRedirect(
    @Query() query: RedirectDTO.Query,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { clientRedirectUrl, accessToken, refreshToken } =
      await this._AuthService.handleRedirect(query);

    CookiesUtils.setTokens(accessToken, refreshToken, response);

    return response.redirect(clientRedirectUrl);
  }
}
