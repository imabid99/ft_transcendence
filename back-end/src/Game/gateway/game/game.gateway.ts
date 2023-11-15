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
import { UserService } from "../../../user/user.service";
import { Server } from "socket.io";
import { subscribe } from "diagnostics_channel";
import { MatchType } from "@prisma/client";
import { use } from "passport";
import { Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GameService } from "src/Game/game.service";

class GameStateManager {
  private gameData: any = {}; // Initialize with your game data structure

  updateGame(data: any) {
    // Update the game state using data received from clients
    // This could include ball position, paddle positions, scores, etc.
    // You need to define the structure of `data` based on your game logic.
    // Update this.gameData accordingly.
  }

  getGameData() {
    return this.gameData;
  }
}

const gameStateManager = new GameStateManager();

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
    private userService: UserService,
    private gameService: GameService
  ) {}
  @WebSocketServer()
  server: SocketIO.Server;

  private waitingPlayers: { username: string; userId : string ;client: Socket }[] = [];
  
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

  @UseGuards(AuthGuard("jwt"))
  async handleConnection(client: Socket) {
    // console.log("server listening on port 3000");
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt_decode(token);
      const userId = decoded.userId;
      const username = decoded.username;
      console.log(`Client ${decoded.username} connected`);
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
          const matchId = await this.gameService.createMatch(creator, opponent, MatchType.RANDOM);
          creator.client.join(matchId);
          opponent.client.join(matchId);
        } else {
          this.waitingPlayers.unshift(opponent);
        }
      }
    }
  }

  handleDisconnect(client: Socket) {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt_decode(token);
      const username = decoded.username;
      console.log(`Client ${username} disconnected`);
      const index = this.waitingPlayers.findIndex(
        (player) => player.client === client
      );
      if (index !== -1) {
        this.waitingPlayers.splice(index, 1);
      }
    }
    this.matches.delete(client.id);
  }

  // @SubscribeMessage("paddle-move")
  // handlePaddleMove(
  //   client: Socket,
  //   payload: { direction: string; moving: boolean; playerId?: string }
  // ) {
  //   const match = this.matches.get(client.id);
  //   if (match) {
  //     const { matchId, players } = match;
  //     // if (players[0].client.id === client.id) {
  //     gameStateManager.updateGame({ paddleMove: payload });
  //     this.server.to(matchId).emit("paddle-move", payload);
  //     // }
  //   }
  // }

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

  // @SubscribeMessage('ballPosition')
  // handleBallPosition(client: Socket, payload: {x: number, y: number, z: number}) {
  //   const match = this.matches.get(client.id);
  //   if (match) {
  //     const { matchId, players } = match;
  //       // this.server.to(matchId).emit('ballPosition', payload);
  //       client.broadcast.to(matchId).emit('ballPosition', payload);
  //   }
  // }
  @SubscribeMessage("ball-serve")
  async handleBallServe(
    client: Socket,
    payload: { isServing: boolean; direction: number }
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
    console.log(match.creatorId, match.opponentId, payload.winner);
    let creatorScore : any = null;
    let opponentScore : any = null;
    if (match) {
      if (match.creatorId === payload.winner) {
        console.log('player 1 wins');
        winner = match.creatorId;
        creatorScore = payload.winnerscore;
        opponentScore = payload.loserscore; 
      } else {
        console.log('player 2 wins');
        winner = match.opponentId;
        opponentScore = payload.winnerscore;
        creatorScore = payload.loserscore;
      }
      winnerScore = payload.winnerscore;
      loserScore = payload.loserscore;
      await this.gameService.submitScore(match.id, creatorScore, opponentScore);
      this.server.to(match.id).emit('player-wins', { winner, winnerScore, loserScore });
    }
  }
}
