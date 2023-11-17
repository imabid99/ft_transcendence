import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MatchType, match } from "@prisma/client";


@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) { }

    async createMatch(creator : any, opponent: any, type : MatchType): Promise<string> {
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
            throw error;
        }
    }

    async getMatch(clientId : string): Promise<match> {
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
            throw error;
        }
    }

    async getMatchById(matchId : string): Promise<match> {
        try {
            const match = await this.prisma.match.findUnique({
                where: {
                    id: matchId
                }
            })
            return match;
        } catch (error) {
            throw error;
        }
    }

    async submitScore(matchId : string, creatorScore : number, opponentScore : number): Promise<void> {
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
            throw error;
        }
    }
}