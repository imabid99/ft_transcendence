import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationGateway } from 'src/notification/gateway/notification.gateway';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService , private notificationGateway : NotificationGateway) { }

  async uploadAvatar(path: string, userId: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { profile: true } });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const oldAvatar: string = user.profile.avatar;
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
      this.notificationGateway.updated(userId);
    } catch (error) {
      return error;
    }
  }

  async getAvatar(userId: string): Promise<any> {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: {
          userId,
        },
      });
    } catch (error) {
      return error;
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
      this.notificationGateway.updated(userId);
    } catch (error) {
      return error;
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
      return error;
    }
  }
  async uploadChannelAvatar(path: string, channelId: string): Promise<any> {
    try {
      const channel = await this.prisma.channels.findUnique({
        where: {
          id: channelId,
        },
      });
      if (!channel) {
        throw new NotFoundException("Channel not found");
      }
      await this.prisma.channels.update({
        where: {
          id: channelId,
        },
        data: {
          avatar: path,
        },
      });
    } catch (error) {
      return error;
    }
  }
  async deleteAvatar(userId: string): Promise<any> {

    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { profile: true } });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const oldAvatar: string = user.profile.avatar;
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
      this.notificationGateway.updated(userId);
    } catch (error) {
      return error;
    }
  }
}