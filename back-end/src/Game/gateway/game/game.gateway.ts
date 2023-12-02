import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "socket.io";
import * as SocketIO from "socket.io";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { PrismaService } from "../../../prisma/prisma.service";
import { Server } from "socket.io";
import { subscribe } from "diagnostics_channel";
import { MatchType } from "@prisma/client";
import { use } from "passport";
import { Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GameService } from "src/Game/game.service";
import { v4 as uuidv4 } from 'uuid';


@WebSocketGateway({
  cors: {
    origin: true,
    methods: ["GET", "POST"],

  },
  namespace: "Game",
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private gameService: GameService
  ) {}

  @WebSocketServer()
  server: SocketIO.Server;

  private waitingPlayers: { username: string; userId : string ;client: Socket }[] = [];
  private socketMap: Map<string, Socket[]> = new Map<string, Socket[]>();

  
  private matches: Map<
  string,
  { 
    matchId: string; 
    players: { username: string; userId : string ;client: Socket; score?: number }[];
  }
  > = new Map();

  private playerInMatch(playerId: string): boolean {
    for (const match of this.matches.values()) {
      if (match.players.some(player => player.client.id === playerId)) {
        return true;
      }
    }
    return false;
  }

  
  
  handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    try {

      if (token) {
        const user: any = jwt_decode(token);
        if (user && user.userId) {
          if (!this.socketMap.has(user.userId)) {
            this.socketMap.set(user.userId, []);
          }
          this.socketMap.get(user.userId).push(client);
        }
        const matchtype_ = client.handshake.auth.matchType;
        if(matchtype_ === 'Random')
        {
          this.randomMatchmaking(client);
        }
        else if(matchtype_ === 'Invite')
        {
          this.createMatch(client);
        }
      }
    } catch (e) {
      console.log("error at con ", e);
    }
  }

  //RANDOM GAME

  @SubscribeMessage("matchmaking")
  async randomMatchmaking(client: Socket) {
    try {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt_decode(token);
      if (!decoded || !decoded.userId || !decoded.username) {
        throw new Error('Invalid token');
      }
      const userId = decoded.userId;
      const username = decoded.username;
      const newObject = {
        userId : userId,
        username: username,
        client: client,
      };
      this.waitingPlayers.push(newObject);
      if (this.waitingPlayers.length >= 2) {
        const creator = this.waitingPlayers.shift();
        const opponent = this.waitingPlayers.shift();

        if (creator.userId !== opponent.userId) {
          const matchId = await this.gameService.createMatch(creator.userId, opponent.userId, MatchType.RANDOM);
          await this.gameService.upateMatch(matchId, creator.client.id, opponent.client.id);
          creator.client.join(matchId);
          opponent.client.join(matchId);
          console.log(
            `Match started between ${creator.client.id} and ${opponent.client.id}, in match ${matchId}`
          );
          this.server.to(matchId).emit('match started', { matchId, creator: creator.userId, opponent: opponent.userId });
        } else {
          this.waitingPlayers.unshift(opponent);
        }
      }
    }
    else {
      throw new Error('No token provided');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
  }

  

  @SubscribeMessage("paddle-pos")
  async handlePaddlePos(
    client: Socket,
    payload: { x: number, y: number, z: number; playerId?: string }
  ) {
    const match = await this.gameService.getMatch(client.id);
    if (match) {
      this.server.to(match.id).emit('paddle-pos', payload);
    }
  }

  @SubscribeMessage("ball-serve")
  async handleBallServe(
    client: Socket,
    payload: { isServing: boolean; isServingmobile: boolean; direction: number }
  ) {
    const match = await this.gameService.getMatch(client.id);
    if (match) {
      client.broadcast.to(match.id).emit("ball-serve", payload);
    }
  }

  @SubscribeMessage("player-wins")
  async handleScoreUpdate(
    client: Socket,
    payload: { winner: string, winnerscore: number, loserscore: number }
  ) {
    let winnerScore : number, loserScore: number, winner: string;
    const match = await this.gameService.getMatch(client.id);
    //Should leave the match bitch
    this.server.to(match.id).emit('player-wins', { winner, winnerScore, loserScore });
    
    let creatorScore : any = null;
    let opponentScore : any = null;
    if (match) {
      if (match.creatorId === payload.winner) {
        winner = match.creatorId;
        creatorScore = payload.winnerscore;
        opponentScore = payload.loserscore; 
      } else {
        winner = match.opponentId;
        opponentScore = payload.winnerscore;
        creatorScore = payload.loserscore;
      }
      winnerScore = payload.winnerscore;
      loserScore = payload.loserscore;

      await this.gameService.submitScore(match.id, creatorScore, opponentScore);

      this.socketMap.get(match.creatorId).forEach(socket => {
        socket.leave(match.id);
      });
      this.socketMap.get(match.opponentId).forEach(socket => {
        socket.leave(match.id);
      });
    }
  }

  //INVITE GAME


@SubscribeMessage("createMatch")
async createMatch(client: Socket) {
  try {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt_decode(token);
      if (!decoded || !decoded.userId || !decoded.username) {
        throw new Error('Invalid token');
      }
      const userId = decoded.userId;
      const username = decoded.username;
      const newObject = {
        userId : userId,
        username: username,
        client: client,
      };
      this.waitingPlayers.push(newObject);
      if (this.waitingPlayers.length >= 2) {
        const creator = this.waitingPlayers.shift();
        const opponent = this.waitingPlayers.shift();
        if (creator.username !== opponent.username) {
          console.log(
            `Match started between ${creator.client.id} and ${opponent.client.id}`
          );
          const match = await this.gameService.getMatch2(creator.userId);
          if (match) {
            console.log(match);
            await this.gameService.upateMatch(match.id, creator.client.id, opponent.client.id);
            creator.client.join(match.id);
            opponent.client.join(match.id);
          } else {
            console.log('No match found for user: ', creator.userId);
          }
        } else {
          this.waitingPlayers.unshift(opponent);
        }
      }
    } else {
      throw new Error('No token provided');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

  async handleDisconnect(client: Socket) {
    try {
      const token = client.handshake.headers.authorization?.split(" ")[1];
      const match = await this.gameService.getMatch(client.id);
      if (token && match) {
        const user: any = jwt_decode(token);
        this.server.to(match.id).emit('player-disconnected', { playerId: user.userId });
        if (user && user.userId && this.socketMap.has(user.userId)) {
          const sockets = this.socketMap.get(user.userId);
          const index = sockets.indexOf(client);
          if (index !== -1) {
            sockets.splice(index, 1);
          }
          if (sockets.length === 0) {
            this.socketMap.delete(user.userId);
          }
        }
        if(match.creatorScore !== 7 && match.opponentScore !== 7)
          await this.gameService.deleteMatch(match.id);
      }
      } catch (e) {
        console.log("Error at descon", e);
      }
  }
}
