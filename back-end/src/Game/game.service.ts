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

    expectedScore(rating1: number, rating2: number): number {
        return 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
    }
  
    updateRating(rating: number, expected: number, actual: number, k: number = 32): number {
        return rating + k * (actual - expected);
    }

    async checkAchievements(profile: any) {
        const achievements = await this.prisma.achievement.findMany({
            where: {
                profileId: profile.userId,
            },
        });
    
        return achievements.map(achievement => {
            let completed = false;
            switch (achievement.id) {
                case 1:
                    completed = profile.twc >= 1;
                    break;
                case 2:
                    completed = profile.win >= 1;
                    break;
                case 3:
                    completed = profile.lose >= 1;
                    break;
                case 4:
                    completed = profile.invitematchcount + profile.randommatchcount >= 50;
                    break;
                case 5:
                    completed = profile.invitematchcount >= 1;
                    break;
                case 6:
                    completed = profile.randommatchcount >= 20;
                    break;
                case 7:
                    completed = achievements.every(a => a.id !== 7 && a.completed);
                    break;
                default:
                    break;
            }
    
            return {
                ...achievement,
                completed,
            };
        });
    }

    async submitScore(matchId: string, creatorScore: number, opponentScore: number): Promise<void> {
        try {
            const match = await this.prisma.match.findUnique({
                where: {
                    id: matchId,
                },
            });

            const MatchType = match.type;
    
            const creatorId = match.creatorId;
            const opponentId = match.opponentId;
    
            const creatorProfile = await this.prisma.profile.findUnique({ where: { userId: creatorId } });
            const opponentProfile = await this.prisma.profile.findUnique({ where: { userId: opponentId } });
    
            const creatorRating = creatorProfile.level;
            const opponentRating = opponentProfile.level;
    
            const creatorExpected = this.expectedScore(creatorRating, opponentRating);
            const opponentExpected = this.expectedScore(opponentRating, creatorRating);
    
            const creatorActual = creatorScore > opponentScore ? 1 : 0;
            const opponentActual = opponentScore > creatorScore ? 1 : 0;
    
            const newCreatorRating = this.updateRating(creatorRating, creatorExpected, creatorActual);
            const newOpponentRating = this.updateRating(opponentRating, opponentExpected, opponentActual);

            const creatorAchievements = await this.checkAchievements(creatorProfile);
            const opponentAchievements = await this.checkAchievements(opponentProfile);
            
            await this.prisma.profile.update({
                where: { userId: creatorId },
                data: { 
                    level: newCreatorRating,
                    win: creatorActual ? { increment: 1 } : undefined,
                    lose: creatorActual ? undefined : { increment: 1 },
                    invitematchcount: MatchType === "FRIEND" ? { increment: 1 } : undefined,
                    randommatchcount: MatchType === "RANDOM" ? { increment: 1 } : undefined,
                    twc: creatorScore === 7 && opponentScore === 6 ? { increment: 1 } : undefined,
                    achievements: { set: creatorAchievements },
                },
            });
            
            await this.prisma.profile.update({
                where: { userId: opponentId },
                data: { 
                    level: newOpponentRating,
                    win: opponentActual ? { increment: 1 } : undefined,
                    lose: opponentActual ? undefined : { increment: 1 },
                    invitematchcount: MatchType === "FRIEND" ? { increment: 1 } : undefined,
                    randommatchcount: MatchType === "RANDOM" ? { increment: 1 } : undefined,
                    twc: opponentScore === 7 && creatorScore === 6 ? { increment: 1 } : undefined,
                    achievements: { set: opponentAchievements },
                },
            });
            
            await this.prisma.match.update({
                where: { id: matchId },
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