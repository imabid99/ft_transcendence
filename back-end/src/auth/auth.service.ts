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
import { User } from "@prisma/client";
import axios from 'axios';
import { writeFile } from 'fs';
import { promisify } from 'util';
import * as mime from 'mime-types';

const writeFileAsync = promisify(writeFile);

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
          throw new UnauthorizedException("Invalid password");
        }
      } else {
        throw new NotFoundException("Email not found");
      }
    } catch (error) {
      console.log(error.message);
      return {message : error.message};
    }
  }

  async addUser(userData: UserData, file: any) {
    try {
      console.log(userData);
      let av : string = "uploads/default/nouser.avif";
      if (file && file.path) {
        av = file.path;
        console.log("avatar", av);
      }
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
          oauthid: uuidv4(),
          twoFASecret: await this.generate2FASecret(userData.username),
          profile: {
            create: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              username: userData.username,
              avatar: av,
              achievements : {
                create : {
                }
              }
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
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

  async validateOauthUser(user: any, file : any): Promise<any> {
    try {
      let av : string = user.avatar;
      if (file && file.path) {
        av = file.path;
        console.log("avatar", av);
      }
        const usr = await this.prisma.user.create({
          data: {
            username: user.username,
            email: user.email,
            oauthid: user.oauthid,
            twoFASecret: await this.generate2FASecret(user.username),
            password: uuidv4(),
            profile: {
              create: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                avatar: av,
                achievements : {
                  create : {
                  }
                }
              },
            },
          },
        });
      this.deleteTempUser(user.oauthid);
      return {token : this.userService.generateToken(usr.id, usr.username, usr.email)};
    } catch (error) {
      console.log("val oauth",error);
      throw error;
    }
  }

  async createTempUser(data: any): Promise<string> {
    const { oauthid ,email, firstName, lastName, username , avatar } = data;  
    try {
      const exist = await this.prisma.tempUser.findUnique({ where: { email } });
      if (exist) {
        return exist.id;
      }
      const newAvatar = await this.downloadImage(avatar);
      const tempUser = await this.prisma.tempUser.create({
        data: {
          oauthid,
          email,
          username,
          firstName,
          lastName,
          avatar: newAvatar,
        },
      });
      return tempUser.id;
    } catch (error) {
      return error;
    }
  }

  async getTempUser(id: string): Promise<any> {
    try {
      const tempUser = await this.prisma.tempUser.findUnique({
        where: {
          id,
        },
      });
      return tempUser;
    } catch (error) {
      return error;
    }
  }

  async deleteTempUser(id: string): Promise<any> {
    try {
      await this.prisma.tempUser.delete({
        where: {
          oauthid: id,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async getUserByOauthId(id : string) : Promise<User>
  {
    try {

      const user = await this.prisma.user.findUnique({
        where: {
          oauthid : id,
        },
      });
      return user;
    } catch (error) {
      return error;
    }
  }
  
  async logicAuth(usr :  any): Promise<any> {
    try {
      const user = await this.getUserByOauthId(usr.oauthid);
      if (user)
        return {type : "login" , token : await this.userService.generateToken(user.id, user.username, user.email)};
      else
        return {type : "signup" , token : await this.createTempUser(usr)}
    } catch (error) {
      return error;
    }
  }

  async downloadImage(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });

      // Determine the file extension
      let extension = mime.extension(response.headers['content-type']) || '';
      if (!extension) {
        // Fallback: Extract extension from URL if possible
        const match = url.match(/\.(jpeg|jpg|gif|png|svg)$/);
        extension = match ? match[0] : '';
      }

      if (!extension) {
        throw new Error('Unable to determine file extension');
      }

      const filename = `image_${uuidv4()}.${extension}`;
      await writeFileAsync(`./uploads/all/${filename}`, response.data);
      return `./uploads/all/${filename}`;
    } catch (error) {
      throw new Error('Failed to download and save image: ' + error.message);
    }
  }
}

