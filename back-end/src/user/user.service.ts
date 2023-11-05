import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { chPass } from "../dtos/pass.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  checkMute(
    arg0: number,
    groupId: string
  ):
    | { iMute: boolean; heMute: boolean }
    | PromiseLike<{ iMute: boolean; heMute: boolean }> {
    throw new Error("Method not implemented.");
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getProfiles() {
    const profiles = await this.prisma.profile.findMany();
    return profiles;
  }

  generateToken(userId: string, username: string, email: string): string {
    const token = jwt.sign(
      { userId, username, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return token;
  }

  async changePass(pass: chPass, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const valid = await bcrypt.compare(pass.password, user.password);
    try {
      if (valid) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(pass.newPassword, salt);
        await this.prisma.user.update({
          where: {
            id: id,
          },
          data: {
            password: hash,
          },
        });
      } else {
        throw new NotFoundException("User not found");
      }
    } catch (error) {
      throw new InternalServerErrorException("Internal server error");
    }
  }

  async intraJWT(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return this.generateToken(user.id, user.username, user.email);
  }

  async googleJWT(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return this.generateToken(user.id, user.username, user.email);
  }

  async validateUser(data: any) {
    const { userId } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user ? user : null;
  }

  async getProfile(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const profile = await this.prisma.profile.findUnique({
        where: {
          userId: id,
        },
      });
      return profile;
    } catch (error) {
      throw new InternalServerErrorException("Internal server error");
    }
  }

  async deleteUser(id: string): Promise<any> {
    const uniqueSuffix = Date.now().toString();
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(uuidv4(), salt);
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          deleted: true,
          password: hash,
        },
      });
      await this.prisma.profile.update({
        where: {
          userId: id,
        },
        data: {
          username: {
            set: `username_deleted_${uniqueSuffix}`,
          },
          email: {
            set: `email_deleted_${uniqueSuffix}`,
          },
          firstName: {
            set: "Deleted",
          },
          lastName: {
            set: "User",
          },
          avatar: {
            set: "uploads/default/nouser.avif.png",
          },
        },
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  async isBlocked(
    id: string,
    userId: string
  ): Promise<{ iBlocked: boolean; heBlocked: boolean }> {
    const blocked = await this.prisma.BlockList.findMany({
      where: {
        userId: id,
        blockedId: userId,
      },
    });
    const blocked2 = await this.prisma.BlockList.findMany({
      where: {
        userId: userId,
        blockedId: id,
      },
    });
    if (blocked.length > 0) {
      return { iBlocked: true, heBlocked: false };
    } else if (blocked2.length > 0) {
      return { iBlocked: false, heBlocked: true };
    }
    return { iBlocked: false, heBlocked: false };
  }

  async getUserInfo(id: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });
    delete user.password;
    return user;
  }
}
