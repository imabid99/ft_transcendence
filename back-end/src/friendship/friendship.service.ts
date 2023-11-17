import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FriendshipStatus } from "@prisma/client";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";


@Injectable()
export class FriendshipService {
  constructor(private prisma: PrismaService, private notificationGateway : NotificationGateway) { }

  async makeRequest(senderId: string, receiverId: string): Promise<any> {
    try {
      if (senderId === receiverId) {
        throw new BadRequestException("You can't send a friend request to yourself");
      }
      const existingRelationship = await this.prisma.friendship.findFirst({
        where: {
          OR: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });
      if (existingRelationship && existingRelationship.status === FriendshipStatus.ACCEPTED) {
        throw new ConflictException("You're already friends with this user");
      }
      else if (existingRelationship && existingRelationship.status === FriendshipStatus.PENDING) {
        throw new ConflictException("You've already sent a friend request to this user");
      }
      console.log("request is ", senderId, receiverId);
      await this.prisma.friendship.create({
        data: {
          senderId,
          receiverId,
          status: FriendshipStatus.PENDING,
          actionUserId: senderId,
        },
      });
      const sender = await this.prisma.profile.findUnique({ where: { userId: senderId } });
      const notification = await this.prisma.notification.create({
        data: {
          userId: receiverId,
          type: "FRIEND_REQUEST",
          message: "You have a new friend request",
          actionUserId: senderId,
          actionUserName:  sender.firstName + " " + sender.lastName,
          actionUserAvatar: sender.avatar,
        },
      });
      this.notificationGateway.friendRequest(senderId, receiverId);
      return notification;
    } catch (error) {
      throw error;
    }
  }

  async acceptRequest(senderId: string, receiverId: string, notid : string): Promise<void> {
    try {
      const friendship = await this.prisma.friendship.findFirst({
        where: {
          senderId,
          receiverId,
        },
      });
      await this.prisma.friendship.update({
        where: {
            id: friendship.id,
        },
        data: {
          status: FriendshipStatus.ACCEPTED,
          actionUserId: receiverId,
        },
      });
      await this.prisma.notification.delete({
        where: {
          id: notid,        },
      });
      this.notificationGateway.acceptFriendRequest(senderId, receiverId);
    } catch (error) {
      throw error;
    }
  }

  async refuseRequest(senderId: string, receiverId: string, notid : string): Promise<void> {
    try {
      const friendship = await this.prisma.friendship.findFirst({
        where: {
          senderId,
          receiverId,
        },
      });
      if (!friendship)
        throw new BadRequestException("You have no friend request from this user");
      else if (friendship.status === FriendshipStatus.ACCEPTED)
        throw new ConflictException("You're already friends with this user");
      await this.prisma.friendship.delete({
        where: {
          id: friendship.id,
        }
      });
      console.log("notid is ", notid);
      await this.prisma.notification.delete({
        where: {
          id: notid,
        },
      });
      this.notificationGateway.refuseFriendRequest(senderId, receiverId);
    } catch (error) {
      throw error;
    }
  }

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
          { senderId: userId, status: FriendshipStatus.ACCEPTED },
          { receiverId: userId, status: FriendshipStatus.ACCEPTED },
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

    let friends = friendships.flatMap(friendship => {
      if (friendship.senderId === userId) {
        return friendship.receiver.profile;
      } else {
        return friendship.sender.profile;
      }
    });

    // Deduplicate the friends by their id
    friends = friends.filter((friend, index, self) =>
      index === self.findIndex((t) => (t.userId === friend.userId)));

    return friends;
  }

  async getRequests(userId: string) {

    const friendships = await this.prisma.friendship.findMany({
      where: {
        receiverId: userId,
        status: FriendshipStatus.PENDING,
      },
      include: {
        sender: {
          select: { id: true, profile: true },
        },
      },
    });

    return friendships.map(friendship => ({
      id: friendship.sender.id,
      profile: friendship.sender.profile,
    }));
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