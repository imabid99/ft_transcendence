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
import { NotificationGateway } from "src/notification/gateway/notification.gateway";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private notificationGateway : NotificationGateway,
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
    console.log("heeere :", userData.file);
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
          twoFASecret: await this.generate2FASecret(userData.username),
          profile: {
            create: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              username: userData.username,
              achievements : {
                create : {
                }
              }
            },
          },
        },
      });
    } catch (error) {
      return error;
    }
  }
  generateQR(data: string): Buffer {
    return QRCode.toBuffer(data);
  }

  generate2FASecret(username : string): string {
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `The kingdom of Pong : ${username}`,
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
        label: `The kingdom of Pong`,
        algorithm: "sha1",
      });
      return this.generateQR(url);
    } catch (error) {
      return error;
    }
  }

  async verify2FA(id: string, token: string): Promise<boolean> {
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
        algorithm: "sha1"
      });
      if (verified === true)
        this.notificationGateway.apiSuccess(id, "Code verified");
      else if (verified === false)
        this.notificationGateway.apiError(id, "Code is not valid");
      return verified;
    } catch (error) {
      return error;
    }
  }

  async enable2FA(id: string, token: string): Promise<any> {
    try {
      if (await this.verify2FA(id, token) === true) {
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            twoFAActive: true,
          },
        });
        this.notificationGateway.apiSuccess(id, "2FA enabled");
        return true;
      }else
        return false;
    } catch (error) {
      return error;
    }
  }
  async disable2FA(id: string, token: string): Promise<any> {
    try {
      if (await this.verify2FA(id, token) === true) {
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            twoFAActive: false,
          },
        });
        this.notificationGateway.apiSuccess(id, "2FA disabled");
        return true;
      } else {
        return false;
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
            twoFASecret: await this.generate2FASecret(user.username),
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
            twoFASecret: await this.generate2FASecret(user.email),
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
