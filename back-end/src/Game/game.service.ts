import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MatchType, match } from "@prisma/client";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";


@Injectable()
export class GameService {
    constructor(private prisma: PrismaService, private notificationGateway : NotificationGateway) { }

    async createMatch(creator: any, opponent: any, type: MatchType): Promise<string> {
        try {
            const match = await this.prisma.match.create({
                data: {
                    creatorId: creator.userId,
                    opponentId: opponent.userId,
                    type,
                    creatorSocket: creator.client.id,
                    opponentSocket: opponent.client.id,
                },
            });
            return match.id;
        } catch (error) {
            return error;
        }
    }

    async getMatch(clientId: string): Promise<match> {
        try {
            const match = await this.prisma.match.findFirst({
                where: {
                    OR: [
                        { creatorSocket: clientId },
                        { opponentSocket: clientId },
                    ],
                },
            })
            return match;
        } catch (error) {
            return error;
        }
    }

    async getMatchById(matchId: string): Promise<match> {
        try {
            const match = await this.prisma.match.findUnique({
                where: {
                    id: matchId
                }
            })
            return match;
        } catch (error) {
            return error;
        }
    }

    async submitScore(matchId: string, creatorScore: number, opponentScore: number): Promise<void> {
        try {
            const match = await this.prisma.match.update({
                where: {
                    id: matchId,
                },
                data: {
                    creatorScore: creatorScore,
                    opponentScore: opponentScore,
                },
            });
        } catch (error) {
            return error;
        }
    }

    async makeRequest(senderId: string, OpponentId: string): Promise<void> {
        try {
            if (senderId === OpponentId) {
                throw new BadRequestException("You can't send an invite to yourself");
            }
            const sender = await this.prisma.profile.findUnique({ where: { userId: senderId } });
            const notification = await this.prisma.notification.create({
              data: {
                userId: OpponentId,
                type: "Match_Invitation",
                message: "You have a new match request",
                actionUserId: senderId,
                actionUserName:  sender.firstName + " " + sender.lastName,
                actionUserAvatar: sender.avatar,
              },
            });
            this.notificationGateway.inviteMatch(senderId, OpponentId);
        } catch (error) {
            return error;
        }
    }

    async acceptRequest(senderId: string, receiverId: string, notId : string): Promise<void> {
        try {
            await this.prisma.notification.delete({
                where: {
                  id: notId,        },
              });
            this.notificationGateway.acceptMatchRequest(senderId, receiverId);
        } catch (error) {
            return error;
        }
    }

    async refuseRequest(senderId: string, receiverId: string, notId : string): Promise<void> {
        try {
            await this.prisma.notification.delete({
                where: {
                  id: notId,        },
              });
            this.notificationGateway.refuseMatchRequest(senderId, receiverId);
        } catch (error) {
            return error;
        }
    }

}