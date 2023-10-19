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
import { PrismaService } from "../../prisma/prisma.service";
import { UserService } from "../../user.service";

@WebSocketGateway({
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
      private prisma: PrismaService,
      private userService: UserService
    ) {}
  
    @WebSocketServer()
    server: SocketIO.Server;
  
    async handleConnection(client: Socket) {
      console.log("client  √");
      const token = client.handshake.headers.authorization?.split(" ")[1];
      if (token) {
        const decoded: any = jwt_decode(token);
        client.join(decoded.username);
        const myChannels = await this.prisma.channels.findMany({
          where: {
            Members: {
              some: {
                id: decoded.userId,
              },
            },
          },
        });
        myChannels.map((channel) => {
          client.join(channel.id);
        });
        if (this.server.sockets.adapter.rooms.get(decoded.username)?.size !== 1) {
          return;
        }
        await this.prisma.profile.update({
          where: {
            userId: decoded.userId,
          },
          data: {
            status: "online",
          },
        });
        this.server.emit("refresh");
      }
    }
    async handleDisconnect(client: Socket) {
      console.log("Disconnect  √");
      const token = client.handshake.headers.authorization?.split(" ")[1];
      if (token) {
        const decoded: any = jwt_decode(token);
        if (this.server.sockets.adapter.rooms.get(decoded.username) !== undefined)
          return;
        await this.prisma.profile.update({
          where: {
            userId: decoded.userId,
          },
          data: {
            status: "offline",
          },
        });
  
        this.server.emit("refresh");
      }
    }
} 