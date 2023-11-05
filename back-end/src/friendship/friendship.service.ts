import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FriendshipStatus } from "@prisma/client";


@Injectable()
export class FriendshipService {
  constructor(private prisma: PrismaService) { }

  async makeRequest(senderId: string, receiverId: string): Promise<void> {
    try {
      await this.prisma.friendship.create({
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
          actionUserId: senderId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  // async refuseRequest(senderId: string, receiverId: string): Promise<void> {
  //   try {
  //     await this.prisma.friendship.delete({
  //       where: {
  //         senderId : senderId,
  //         receiverId,
  //       }
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async showFriendship(senderId: string, receiverId: string): Promise<void> {
    try {
      await this.prisma.friendship.findMany({
        where: {
          senderId,
          receiverId,
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async getFriends(userId: string) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: userId, status: 'ACCEPTED' },
          { receiverId: userId, status: 'ACCEPTED' },
        ],
      },
      include: {
        sender: {
          select: { id: true, profile: true }, 
        },
        receiver: {
          select: { id: true, profile: true },
        },
      },
    });

    // Combine and deduplicate the list of friends
    let friends = friendships.flatMap(friendship => {
      // If the current user is the sender, we take the receiver as the friend, and vice versa.
      if (friendship.senderId === userId) {
        return [{ id: friendship.receiver.id, profile: friendship.receiver.profile }];
      } else {
        return [{ id: friendship.sender.id, profile: friendship.sender.profile }];
      }
    });

    // Deduplicate the friends by their id
    friends = friends.filter((friend, index, self) =>
      index === self.findIndex((t) => (t.id === friend.id)));

    return friends;
  }


  // async blockUser(blockerId: string, blockedId: string) {
  //     // Check if there's already a relationship
  //     const existingRelationship = await this.prisma.friendship.findFirst({
  //       where: {
  //         OR: [
  //           { senderId: blockerId, receiverId: blockedId },
  //           { senderId: blockedId, receiverId: blockerId },
  //         ],
  //       },
  //     });

  //     if (existingRelationship) {
  //       return this.prisma.friendship.update({
  //         where: { id: existingRelationship.id },
  //         data: { status: 'BLOCKED', actionUserId: blockerId },
  //       });
  //     } else {
  //       return this.prisma.friendship.create({
  //         data: {
  //           senderId: blockerId,
  //           receiverId: blockedId,
  //           status: 'BLOCKED',
  //           actionUserId: blockerId,
  //         },
  //       });
  //     }
  //   }
  //   async unblockUser(blockerId: string, blockedId: string) {
  //     return this.prisma.friendship.deleteMany({
  //       where: {
  //         senderId: blockerId,
  //         receiverId: blockedId,
  //         status: 'BLOCKED',
  //       },
  //     });
  //   }

  //   async isUserBlocked(userId: string, potentialBlockerId: string) {
  //     const blockedRelationship = await this.prisma.friendship.findFirst({
  //       where: {
  //         senderId: potentialBlockerId,
  //         receiverId: userId,
  //         status: 'BLOCKED',
  //       },
  //     });
  //     return Boolean(blockedRelationship);
  //   }

  //   async getFriendshipStatus(userId: string, friendId: string) {
  //     const friendship = await this.prisma.friendship.findFirst({
  //       where: {
  //         OR: [
  //           { senderId: userId, receiverId: friendId },
  //           { senderId: friendId, receiverId: userId },
  //         ],
  //       },
  //       select: {
  //         status: true,
  //       },
  //     });
  //     return friendship?.status || 'NO_RELATION';
  //   }
}