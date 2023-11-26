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
            console.log("This is the match   ",match);
            return match.id;
        } catch (error) {
            console.log("This is The ERROR  ",error);
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

    // expectedScore(rating1: number, rating2: number): number {
    //     return 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
    // }

    // updateRating(rating: number, expected: number, actual: number, k: number = 32): number {
    //     return rating + k * (actual - expected);
    // }

    async checkAchievements(profile: any) {
        const achievements = await this.prisma.achievement.findUnique({
            where: {
                userId: profile.userId,
            }
        });

        achievements.ach1 = profile.twc >= 1 ? true : false;
        achievements.ach2 = profile.win >= 1 ? true : false;
        achievements.ach3 = profile.lose >= 1 ? true : false;
        achievements.ach4 = profile.invitematchcount + profile.randommatchcount >= 50 ? true : false;
        achievements.ach5 = profile.invitematchcount >= 1 ? true : false;
        achievements.ach6 = profile.randommatchcount >= 20 ? true : false;
        achievements.ach7 = achievements.ach1 && achievements.ach2 && achievements.ach3 && achievements.ach4 && achievements.ach5 && achievements.ach6 ? true : false;

        await this.prisma.achievement.update({
            where: { userId: profile.userId },
            data: {
                ach1: achievements.ach1,
                ach2: achievements.ach2,
                ach3: achievements.ach3,
                ach4: achievements.ach4,
                ach5: achievements.ach5,
                ach6: achievements.ach6,
                ach7: achievements.ach7,
            },
        });
    
        console.log("achievements : ", achievements);
        return achievements;
    }

    async submitScore(matchId: string, creatorScore: number, opponentScore: number): Promise<void> {
        try {
            const match = await this.prisma.match.findUnique({
                where: {
                    id: matchId,
                },
            });

            await this.prisma.match.update({
                where: { id: matchId },
                data: {
                    creatorScore: creatorScore,
                    opponentScore: opponentScore,
                },
            });

            const MatchType = match.type;
            
            const winnerId = creatorScore > opponentScore ? match.creatorId : match.opponentId;
            const loserId = creatorScore > opponentScore ? match.opponentId : match.creatorId;
            const winnerProfile = await this.prisma.profile.findUnique({ where: { userId: winnerId } });
            const loserProfile = await this.prisma.profile.findUnique({ where: { userId: loserId } });
            
            console.log(winnerId, " WON!");
            winnerProfile.xp += 100;
            winnerProfile.nextLevelXp = winnerProfile.level === 0 ? 500 : (winnerProfile.level + 1) * 1000;
            if (winnerProfile.xp >= winnerProfile.nextLevelXp) {
                winnerProfile.level += 1;
                winnerProfile.xp = winnerProfile.xp - winnerProfile.nextLevelXp;
            }
            winnerProfile.percentage = (winnerProfile.xp / winnerProfile.nextLevelXp) * 100;
            winnerProfile.points += 50;
            
            
            
            
            await this.prisma.profile.update({
                where: { userId: winnerId },
                data: {
                    xp: winnerProfile.xp,
                    level: winnerProfile.level,
                    points: winnerProfile.points,
                    ratio: winnerProfile.ratio,
                    nextLevelXp: winnerProfile.nextLevelXp,
                    percentage: winnerProfile.percentage,
                    win: { increment: 1 },
                    invitematchcount: MatchType === "FRIEND" ? { increment: 1 } : { increment: 0 },
                    randommatchcount: MatchType === "RANDOM" ? { increment: 1 } : { increment: 0 },
                    twc: Math.abs(creatorScore - opponentScore) === 1 ?{ increment: 1 } : { increment: 0 },
                    // achievements: { set: creatorAchievements },
                },
            });
            
            await this.prisma.profile.update({
                where: { userId: loserId },
                data: {
                    xp: loserProfile.xp,
                    level: loserProfile.level,
                    points: loserProfile.points,
                    ratio: loserProfile.ratio,
                    nextLevelXp: loserProfile.nextLevelXp,
                    lose: { increment: 1 },
                    invitematchcount: MatchType === "FRIEND" ? { increment: 1 } : { increment: 0 },
                    randommatchcount: MatchType === "RANDOM" ? { increment: 1 } : { increment: 0 },
                    // achievements: { set: opponentAchievements },
                },
            });
            
            await this.checkAchievements(winnerProfile);
            await this.checkAchievements(loserProfile);

        } catch (error) {
            console.log("This is the ERROR  in submitScore ",error);
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