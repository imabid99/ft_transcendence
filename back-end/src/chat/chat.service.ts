import { Injectable, UseGuards , NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { UserData } from "../dtos/user.dto";
import { UserDataLogin } from "../dtos/user-login.dto";
import { chPass } from "../dtos/pass.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}

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
          throw new NotFoundException("Channel not found");
        }
        delete channel.password;
        delete channel.accessPassword;
        return channel;
      }


    async getMessages(id: string): Promise<any> {
        const messages = await this.prisma.message.findMany({
        where: {
            userId: +id,
        },
        });
        return messages;
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
}
