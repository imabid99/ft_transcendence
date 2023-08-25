import { Injectable, UseGuards } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserData } from "./dtos/user.dto";
import { UserDataLogin } from "./dtos/user-login.dto";
import { chPass } from "./dtos/pass.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import passport from "passport";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();
    // delete users password;
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }
  async getProfiles() {
    const profiles = await this.prisma.profile.findMany();
    return profiles;
  }
  async getLastMessage(id: string | number) {
    const getLastMessage = await this.prisma.message.findMany({
      where: {
        userId: +id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });
    return getLastMessage;
  }

  async addUser(userData: UserData) {
    let exist = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (!exist) {
      exist = await this.prisma.user.findUnique({
        where: {
          username: userData.username,
        },
      });
    }
    if (!exist) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(userData.password, salt);
      await this.prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: hash,
          profile: {
            create: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              username: userData.username,
            },
          },
        },
      });
      return "User created";
    } else {
      return "user exist";
    }
  }
  generateToken(userId: number, username: string, email: string): string {
    const token = jwt.sign(
      { userId, username, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }

  async login(userData: UserDataLogin) {
    let user: any;
    if (userData.email) {
      user = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });
    }
    if (user) {
      const valid = await bcrypt.compare(userData.password, user.password);
      if (valid) return this.generateToken(user.id, user.username, user.email);
      else {
        return "invalid password";
      }
    } else {
      throw "invalid creds";
    }
  }

  async changePass(pass: chPass, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: +id } });
    const valid = await bcrypt.compare(pass.password, user.password);

    if (valid) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(pass.newPassword, salt);
      await this.prisma.user.update({
        where: {
          id: +id,
        },
        data: {
          password: hash,
        },
      });
      return "Changed successfully";
    } else {
      return "invalid password";
    }
  }

  async intraJWT(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return this.generateToken(user.id, user.username, user.email);
  }

  async validateUser(data: any) {
    const { userId } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });

    return user ? user : null;
  }

  async getProfile(id: string) {
    if (!isNaN(+id)) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: +id,
        },
      });
      if (!user) return "Not found";
    }
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId: +id,
      },
    });
    return profile;
  }
  async validateJwtToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.log("error : ", error);
      return null;
    }
  }
  async validateIntraUser(user: any): Promise<any> {
    const exist = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (!exist) {
      await this.prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          id42: +user.fortyTwoId,
          password: "hhhh",
          profile: {
            create: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
            },
          },
        },
      });
    }
    return user;
  }

  async getMessages(id: string): Promise<any> {
    const messages = await this.prisma.message.findMany({
      where: {
        userId: +id,
      },
    });
    return messages;
  }
  async getUserInfo(token: string): Promise<any> {
    const decoded: any = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );
    const user = await this.prisma.user.findUnique({
      where: {
        id: +decoded.userId,
      },
    });
    delete user.password;
    return user;
  }

  async isBlocked(
    id: string,
    userId: string
  ): Promise<{ iBlocked: boolean; heBlocked: boolean }> {
    if (isNaN(+id) || isNaN(+userId)) {
      return { iBlocked: false, heBlocked: false };
    }
    const blocked = await this.prisma.BlockList.findMany({
      where: {
        userId: +id,
        blockedId: +userId,
      },
    });
    const blocked2 = await this.prisma.BlockList.findMany({
      where: {
        userId: +userId,
        blockedId: +id,
      },
    });
    if (blocked.length > 0) {
      return { iBlocked: true, heBlocked: false };
    } else if (blocked2.length > 0) {
      return { iBlocked: false, heBlocked: true };
    }
    return { iBlocked: false, heBlocked: false };
  }

  async getMyChannels(id: string): Promise<any> {
    const channels = await this.prisma.channels.findMany({
      where: {
        Members: {
          some: {
            id: +id,
          },
        },
      },
      include: {
        Messages: true,
      }
    });
    channels.forEach((channel) => {
      delete channel.password;
      delete channel.accessPassword;
    });
    return channels;
  }

  async getChannel(myId: string, channelId: string): Promise<any> {
    const channel = await this.prisma.channels.findUnique({
      where: {
        id: channelId,
      },
      include: {
        Members: true,
        Owners: true,
        Admins: true,
        Messages: true,
      },

    });
    const isMumber: boolean = channel.Members.some((member) => {
      return member.id === +myId;
    });
    if (!isMumber) {
      return "not member";
    }
    delete channel.password;
    delete channel.accessPassword;
    return channel;
  }

}
