import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FriendshipStatus } from "@prisma/client";


@Injectable()
export class FriendshipService{
  constructor(private prisma: PrismaService) {}

    async makeRequest(senderId: string, receiverId: string): Promise<void> {
        try {

            this.prisma.friendship.create({
                data: {
                    senderId,
                    receiverId,
                    status: FriendshipStatus.PENDING,
                    actionUserId: senderId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async acceptRequest(senderId: string, receiverId: string): Promise<void> {
        try {
        await this.prisma.friendship.updateMany({
            where: {
            senderId,
            receiverId,
            },
            data: {
            status: FriendshipStatus.ACCEPTED,
            },
        });
        } catch (error) {
        throw error;
        }
    }
}