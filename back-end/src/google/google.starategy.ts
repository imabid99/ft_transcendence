import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      clientID: process.env.UID_GOOGLE,
      clientSecret: process.env.SECRET_GOOGLE,
      callbackURL: process.env.CALLBACK_URL_GOOGLE,
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id, username, emails, name } = profile;
    const userData = {
      oauthid : id.toString(),
      username,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatar: profile.photos[0].value,
    };
    return await this.authService.logicAuth(userData);
  }
}
