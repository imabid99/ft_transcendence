import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MatchType, match } from "@prisma/client";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";


@Injectable()
export class GameService {
    constructor(private prisma: PrismaService, private notificationGateway : NotificationGateway) { }

    async createMatch(creatorId: any, opponentId: any, type: MatchType): Promise<string> {
        try {
            const match = await this.prisma.match.create({
                data: {
                    creatorId: creatorId,
                    opponentId: opponentId,
                    type: type,
                },
            });
            return match.id;
        } catch (error) {
            return error;
        }
    }

    async  getMatch(clientId: string): Promise<match> {
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

    async  getMatch2(clientId: string): Promise<match> {
        try {
            const match = await this.prisma.match.findFirst({
                where: {
                    OR: [
                        { creatorId: clientId },
                        { opponentId: clientId },
                    ],
                },
                orderBy: { createdAt: 'desc' },
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
            // const match = this.prisma.match.findUnique({
            //     where: {
            //         id: matchId,
            //     },
            // });
            // const opponentId = match.opponentId;
            // const creatorId = match.creatorId;
            // const creator = await this.prisma.profile.findUnique({ where: { userId: creatorId } });
            // const opponent = await this.prisma.profile.findUnique({ where: { userId: opponentId } });
            // await this.prisma.profile.update({
            //     where: {
            //         userId: creatorId,
            //     },
            //     data: {
            //         level : creator.score + creatorScore,
            //     },
            // });
            await this.prisma.match.update({
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

    async upateMatch(matchId, creatorSocket : string, opponentSocket : string) : Promise<void> 
    {
        try {
            await this.prisma.match.update({
                where: {
                    id: matchId,
                },
                data: {
                    creatorSocket: creatorSocket,
                    opponentSocket: opponentSocket,
                },
            });
        } catch (error) {
            return error;
        }
    }

    async acceptRequest(senderId: string, receiverId: string, notId : string): Promise<void> {
        try {
            await this.prisma.notification.delete({
                where: {
                  id: notId,  },
              });
            const matchId = await this.createMatch(senderId, receiverId, MatchType.FRIEND);
            this.notificationGateway.acceptMatchRequest(senderId, receiverId, matchId);
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