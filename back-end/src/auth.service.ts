import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserData } from "./dtos/user.dto";
import { UserDataLogin } from "./dtos/user-login.dto";
import * as bcrypt from "bcrypt";
import { UserService } from "./user.service";
import e from "express";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async login(userData: UserDataLogin) {
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
      throw error;
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
      throw error;
    }
  }
  
}
