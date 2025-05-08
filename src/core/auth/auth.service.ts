import { BadRequestException, Injectable } from '@nestjs/common';
import { IAuthService } from '@/core/auth/types/auth.service.types';
import { google } from 'googleapis';
import { GoogleHelper } from '@/helpers/google/google.helper';
import { ObjectUtils } from '@/utils/object';
import { Errors } from '@/static/errors/errors';
import { AccountsRepository } from '@/core/accounts/accounts.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _AccountsRepository: AccountsRepository,
    private readonly _JwtService: JwtService,
  ) {}

  public async getMe(
    params: IAuthService.GetMe.Parameters,
  ): IAuthService.GetMe.ReturnType {
    return this._AccountsRepository.update({
      id: params.accountId,
      data: {
        lastVisit: new Date().toISOString().replace('Z', '+00:00'),
      },
    });
  }

  public async SignIn(
    state: IAuthService.GenerateRedirectUrl.Params,
  ): IAuthService.GenerateRedirectUrl.ReturnType {
    const serializedState = ObjectUtils.toBase64(state);
    const googleHelper = this._getGoogleHelper();

    try {
      const redirectUrl = googleHelper.getConsentPageUrl({
        state: serializedState,
      });

      return { redirectUrl };
    } catch (error) {
      throw new Error('Unable to generate redirect URL');
    }
  }

  public async handleRedirect({
    code,
    state,
  }: IAuthService.HandleRedirect.Params): IAuthService.HandleRedirect.ReturnType {
    const deserializedState = ObjectUtils.fromBase64(state);

    const { clientRedirectUrl } = deserializedState.state;
    if (!code) return clientRedirectUrl;

    const googleHelper = this._getGoogleHelper();

    try {
      const { access_token: accessToken, refresh_token: refreshToken } =
        await googleHelper.getTokens({
          code,
        });

      if (!refreshToken) throw new BadRequestException(Errors.NoRefreshToken);

      const accountProfile = await this._getAccountProfile(accessToken);

      const account = await this._AccountsRepository.getOne({
        email: accountProfile.email,
      });

      let accountId: string;

      if (!account) {
        const newAccount = await this._AccountsRepository.create({
          firstName: accountProfile.given_name,
          lastName: accountProfile.family_name,
          email: accountProfile.email,
          isVerifiedEmail: accountProfile.verified_email,
          picture: accountProfile.picture,
        });

        accountId = newAccount._id.toString();
      } else {
        accountId = account._id.toString();
      }

      const tokens = this._createTokensPair({
        accountId,
      });

      return {
        clientRedirectUrl,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw new Error('Unable to generate redirect URL');
    }
  }

  private async _getAccountProfile(accessToken: string) {
    try {
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accessToken });

      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2',
      });

      const { data } = await oauth2.userinfo.get();

      if (!data) throw new Error('No user data returned');

      return data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }

  private _getGoogleHelper(): GoogleHelper {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI } =
      process.env;

    const oAuthClient = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      REDIRECT_URI,
    );

    return new GoogleHelper(oAuthClient);
  }

  private _createTokensPair({
    accountId,
  }: IAuthService.CreateTokenPair.Parameters): IAuthService.CreateTokenPair.ReturnType {
    const accessToken = this._createAccessToken({ accountId });
    const refreshToken = this._createRefreshToken({ accountId });

    return {
      accessToken,
      refreshToken,
    };
  }

  private _createAccessToken({
    accountId,
  }: IAuthService.CreateAccessToken.Parameters): string {
    return this._JwtService.sign(
      { accountId, type: 'access' },
      { expiresIn: '30m' },
    );
  }

  private _createRefreshToken({
    accountId,
  }: IAuthService.CreateRefreshToken.Parameters): string {
    return this._JwtService.sign(
      { accountId, type: 'refresh' },
      { expiresIn: '30d' },
    );
  }
}
