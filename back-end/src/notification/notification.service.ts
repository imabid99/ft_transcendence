import { Injectable, UseGuards , NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService {
    constructor(
      private prisma: PrismaService,
      private userService: UserService,
      
      ) {}

    async getNotifications(userId: string): Promise<any> {
        try {
          const user = await this.prisma.user.findUnique({ where: { id: userId } , include: { profile: true }});
          if (!user) {
            throw new NotFoundException("User not found");
          }
          const notifications = await this.prisma.notification.findMany({
            where: {
              userId,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
          return notifications;
        } catch (error) {
          throw error;
        }
      }
}
