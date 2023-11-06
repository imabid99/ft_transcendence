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
    private userService: UserService
  ) {}
  @WebSocketServer()
  server: SocketIO.Server;

  
  private waitingPlayers: {username: string, client: Socket}[] = [];
  private matches: Map<string, {matchId: string, players: {username: string, client: Socket}[]}> = new Map();
  

  handleConnection(client: Socket) {
    console.log("server listening on port 3000");
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt_decode(token);
      const username = decoded.username;
      console.log(`Client ${username} connected`);
      const newObject = {
        username: username,
        client : client
      }
      this.waitingPlayers.push(newObject);
      if (this.waitingPlayers.length >= 2) {
        const player1 = this.waitingPlayers.shift();
        const player2 = this.waitingPlayers.shift();
        if (player1.username !== player2.username) {
          console.log(`Match started between ${player1.client.id} and ${player2.client.id}`);
          const matchId = `match-${player1.client.id}-${player2.client.id}`
          player1.client.join(matchId);
          player2.client.join(matchId);
    
          // Store the match ID and the players in the matches map
          this.matches.set(player1.client.id, {matchId, players: [player1, player2]});
          this.matches.set(player2.client.id, {matchId, players: [player1, player2]});
        } else {
          this.waitingPlayers.unshift(player2);
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
      const index = this.waitingPlayers.findIndex(player => player.client === client);
      if (index !== -1) {
        this.waitingPlayers.splice(index, 1);
      }
    }
    this.matches.delete(client.id);
  }


  
  @SubscribeMessage('paddle-move')
  handlePaddleMove(client: Socket, payload: { direction: string, moving: boolean, playerId?: string }) {
    const match = this.matches.get(client.id);
    if (match) {
      const {matchId, players} = match;
      // if (players[0].client.id === client.id) {
        gameStateManager.updateGame({ paddleMove: payload });
        this.server.to(matchId).emit('paddle-move', payload);
        console.log(payload, "CHI HAJA");
      // }
    }
  }

  @SubscribeMessage('balllPosition')
  handleBallPosition(client: Socket, payload: {x: number, y: number, z: number}) {
    const match = this.matches.get(client.id);
    // if (match) {
      const {matchId, players} = match;
      this.server.to(matchId).emit('ballPosition', payload);
    // }
  }
}







