import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { UserService } from '../user.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.UID,
      clientSecret: process.env.SECRET,
      callbackURL: 'http://127.0.0.1:3000/api/user/intra',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done : any): Promise<any> {
    const { id, username ,emails ,name} =  profile;
    const userData = {
      fortyTwoId: id,
      username,
      email : emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const user = await this.userService.validateIntraUser(userData);
    return user;
  }
}

