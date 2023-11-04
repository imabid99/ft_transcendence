import { Injectable, UseGuards , NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
    constructor(
      private prisma: PrismaService,
      private userService: UserService,
      
      ) {}

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
            Band : true,
            Muts: true,
          },
    
        });
        if (!channel) {
          throw new NotFoundException("Channel not found");
        }
        
        const isMumber: boolean = channel.Members?.some((member) => {
          return member.id === myId;
        });
        if (!isMumber) {
          throw new NotFoundException("Channel not found");
        }
        delete channel.password;
        delete channel.accessPassword;
        // check if i am admin or owner
        const isAdmin: boolean = channel.Admins.some((admin) => {
          return admin.id === myId;
        });
        const isOwner: boolean = channel.Owners.some((owner) => {
          return owner.id === myId;
        });
        if (!isAdmin && !isOwner) {
          delete channel.Band;
          delete channel.Muts;
        }

        const membersProfile = await this.getMembersProfile(channel.Members);
        return {channel, membersProfile};
    }
    async getMembersProfile(members: any): Promise<any> {
      let membersProfile: any[] = [];
      await Promise.all(members.map(async (member) => {
        const profile = await this.userService.getProfile(member.id);
        membersProfile.push(profile);
      }));
      return membersProfile;
    }

    async getMessages(id: string): Promise<any> {
        const messages = await this.prisma.message.findMany({
        where: {
            userId: id,
        },
        });
        return messages;
    }

    async getMyChannels(id: string): Promise<any> {
        const channels = await this.prisma.channels.findMany({
          where: {
            Members: {
              some: {
                id: id,
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

    async getChannels(id: number): Promise<any> {
        const channels = await this.prisma.channels.findMany({
          include: {
            Members: true,
          }
        });
        
        // delete private channels
        const publicChannels = channels.filter((channel:any) => {
          return channel.type !== "private";
        }).filter((channel:any) => {
          const isMumber: boolean = channel.Members?.some((member) => {
            return member.id === id;
          });
          return isMumber === false ? channel : null;
        });
        

        publicChannels.forEach((channel : any) => {
          delete channel.password;
          delete channel.accessPassword;
          delete channel.Members;
        });
        return publicChannels;
    }

    async checkMute(id: String, channelId: string): Promise<any> {
        const channel = await this.prisma.channels.findUnique({
          where: {
            id: channelId,
          },
          include: {
            Members: true,
            Band: true,
          },
        });
        const isMumber: boolean = channel.Members.some((member) => {
          return member.id === id;
        });
        if (!isMumber) {
          throw new NotFoundException("Channel not found");
        }
        const isMute: boolean = channel.Band.some((member) => {
          return member.id === id;
        });
        if (isMute) {
          const mut :any= await this.prisma.Muted.findMany({
            where: {
              userId: id,
              channelId: channelId,
            },
          });
          const timeNow = new Date();
          const timeOffMute = new Date(mut[0].timeOffMute);
          if (mut[0]  && timeNow < timeOffMute) {
            return true;
          }
          await this.prisma.Muted.deleteMany({
            where: {
              userId: id,
              channelId: channelId,
            },
          });
        }
        return false;
    }
    async getMyBlocked(id: string): Promise<any> {
        const blocked = await this.prisma.Blocked.findMany({
          where: {
            userId: id,
          },
        });
        const ret = blocked.map((block) => {
          return block.blockedId === id ? block.userId : block.blockedId;
        });
        return ret;
    }
}
