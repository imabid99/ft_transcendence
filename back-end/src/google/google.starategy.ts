import { PassportStrategy } from "@nestjs/passport";
import { Strategy , VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.UID_GOOGLE,
      clientSecret: process.env.SECRET_GOOGLE,
      callbackURL: process.env.CALLBACK_URL_GOOGLE,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, username ,emails ,name} =  profile;
    const userData = {
      googleId: id,
      username,
      email : emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const user = await this.userService.validateGoogleUser(userData);
    return done(null, userData);
  }
}