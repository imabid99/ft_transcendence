import { channels } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadAvatar(path: string, userId: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } , include: { profile: true }});
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const oldAvatar : string =  user.profile.avatar;
      if (!oldAvatar.startsWith("uploads/default")) {
        const fs = require("fs");
        fs.unlinkSync(oldAvatar);
      }
      await this.prisma.profile.update({
        where: {
          userId,
        },
        data: {
          avatar: path,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAvatar(userId: string): Promise<any> {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: {
          userId,
        },
      });
      return profile.avatar;
    } catch (error) {
      throw error;
    }
  }
  async uploadCover(path: string, userId: string): Promise<any> {
    try {
      await this.prisma.profile.update({
        where: {
          userId,
        },
        data: {
          cover: path,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async getCover(userId: string): Promise<any> {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: {
          userId,
        },
      });
      return profile.cover;
    } catch (error) {
      throw error;
    }
  }
  async uploadChannelAvatar(path: string, channelId: string): Promise<any> {
    try {
      console.log("------------------");
      await this.prisma.channels.update({
        where: {
          id: channelId,
        },
        data: {
          avatar: path,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async deleteAvatar(userId: string): Promise<any> {
    
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } , include: { profile: true }});
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const oldAvatar : string =  user.profile.avatar;
      if (!oldAvatar.startsWith("uploads/default")) {
        const fs = require("fs");
        fs.unlinkSync(oldAvatar);
      }
      await this.prisma.profile.update({
        where: {
          userId,
        },
        data: {
          avatar: "uploads/default/nouser.avif",
        },
      }); 
    } catch (error) {
      throw error;
    }
  }
}