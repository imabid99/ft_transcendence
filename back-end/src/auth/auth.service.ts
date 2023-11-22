import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserData } from "../dtos/user.dto";
import { UserDataLogin } from "../dtos/user-login.dto";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import * as QRCode from "qrcode";
import * as speakeasy from "speakeasy";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) { }

  async login(userData: UserDataLogin): Promise<any> {
    try {
      let user: any;
      if (userData.email) {
        user = await this.prisma.user.findUnique({
          where: { email: userData.email },
        });
      }
      if (user) {
        const valid = await bcrypt.compare(userData.password, user.password);
        if (valid)
          return this.userService.generateToken(
            user.id,
            user.username,
            user.email
          );
        else {
          throw new UnauthorizedException("Invalid credentials");
        }
      } else {
        throw new NotFoundException("User not found");
      }
    } catch (error) {
      return error;
    }
  }

  async addUser(userData: UserData) {
    try {
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
      if (exist) {
        throw new BadRequestException("User already exist");
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(userData.password, salt);
      await this.prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: hash,
          twoFASecret: this.generate2FASecret(userData.username),
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
    } catch (error) {
      return error;
    }
  }
  async generateQR(data: string): Promise<Buffer> {
    return QRCode.toBuffer(data);
  }

  generate2FASecret(username : string): string {
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `Pong Masters:${username}`,
    });
    return secret.base32;
  }

  async generate2FAQrCode(id: string): Promise<Buffer> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      const url = speakeasy.otpauthURL({
        secret: user.twoFASecret,
        encoding: "base32",
        label: "Pong Masters",
        algorithm: "sha512",
      });
      return this.generateQR(url);
    } catch (error) {
      return error;
    }
  }
  async verify2FA(id: string, token: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        encoding: "base32",
        token: token,
      });

      if (verified) {
        return "Verification successful!";
      } else {
        throw new BadRequestException("Invalid token");
      }
    } catch (error) {
      return error;
    }
  }
  async enable2FA(id: string, token: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      console.log(token);
      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        encoding: "base32",
        token: token,
      });
      console.log(verified);
      if (verified) {
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            twoFAActive: true,
          },
        });
      } 
      return verified;
    } catch (error) {
      return error;
    }
  }
  async disable2FA(id: string, token: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        encoding: "base32",
        token: token,
      });

      if (verified) {
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            twoFAActive: false,
          },
        });
        return "Updated successfully!";
      } else {
        throw new BadRequestException("Invalid token");
      }
    } catch (error) {
      return error;
    }
  }

  async validateIntraUser(user: any): Promise<any> {
    try {
      const exist = await this.prisma.user.findUnique({
        where: { email: user.email },
      });
      if (!exist) {
        await this.prisma.user.create({
          data: {
            username: user.username,
            email: user.email,
            id42: user.fortyTwoId,
            twoFASecret: this.generate2FASecret(user.username),
            password: "42",
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
    } catch (error) {
      throw new InternalServerErrorException("Internal server error");
    }
  }

  async validateGoogleUser(user: any): Promise<any> {
    try {
      const exist = await this.prisma.user.findUnique({
        where: { email: user.email },
      });
      if (!exist) {
        await this.prisma.user.create({
          data: {
            username: "user.username",
            email: user.email,
            idGoogle: user.googleId,
            twoFASecret: this.generate2FASecret(user.email),
            password: "google",
            profile: {
              create: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: "user.username",
              },
            },
          },
        });
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException("Internal server error");
    }
  }
}
