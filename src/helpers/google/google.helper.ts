import { GoogleConstants } from '@/static/google/google';
import { OAuth2Client } from 'google-auth-library';
import { IGoogleBaseHelper } from '@/helpers/google/google.helper.types';

export class GoogleHelper {
  public readonly _OAuth2Client: OAuth2Client;

  constructor(oAuthClient: OAuth2Client) {
    this._OAuth2Client = oAuthClient;
  }

  public getConsentPageUrl({
    state,
  }: IGoogleBaseHelper.GetConsentPageUrl.Parameters): string {
    return this._OAuth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      state,
      scope: [
        GoogleConstants.Scopes.PeopleUserInfoProfile,
        GoogleConstants.Scopes.PeopleUserInfoEmail,
      ],
    });
  }

  public async getTokens({
    code,
  }: IGoogleBaseHelper.GetTokens.Parameters): IGoogleBaseHelper.GetTokens.ReturnType {
    const { tokens } = await this._OAuth2Client.getToken(code);

    return tokens;
  }
}
