
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "socket.io";
import * as SocketIO from "socket.io";
import { PrismaService } from "../../prisma/prisma.service";
import { UserService } from "../../user/user.service";
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@WebSocketGateway({
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
  namespace: "notification",
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) { }
  @WebSocketServer()
  server: SocketIO.Server;

  private socketMap: Map<string, Socket[]> = new Map<string, Socket[]>();

  @UseGuards(AuthGuard("jwt"))
  async handleConnection(socket: Socket) {
   
  }


  @UseGuards(AuthGuard("jwt"))
  async handleDisconnect(socket: Socket) {
  }

  
}
