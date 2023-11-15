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
import { NotificationService } from "../notification.service";
import jwt_decode from "jwt-decode";
import { FriendshipService } from "../../friendship/friendship.service";

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
    private userService: UserService,
    private notificationService: NotificationService,
    private friendshipService: FriendshipService,
  ) { }
  @WebSocketServer()
  server: SocketIO.Server;

  private socketMap: Map<string, Socket[]> = new Map<string, Socket[]>();

  async handleConnection(socket: Socket) {
    console.log(`Client connected`);
    const token = socket.handshake.headers.authorization?.split(" ")[1];
    const user: any = jwt_decode(token);
    if (user && user.userId) {
      if (!this.socketMap.has(user.userId)) {
        this.socketMap.set(user.userId, []);
      }
      this.socketMap.get(user.userId).push(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    const token = socket.handshake.headers.authorization?.split(" ")[1];
    const user: any = jwt_decode(token);
    if (user && user.userId && this.socketMap.has(user.userId)) {
      const sockets = this.socketMap.get(user.userId);
      const index = sockets.indexOf(socket);
      if (index !== -1) {
        sockets.splice(index, 1);
      }
      if (sockets.length === 0) {
        this.socketMap.delete(user.userId);
      }
    }
  }

  sendfriendRequestNotification(senderId: string, receiverId: string) {
    
  }

  sendNotification(id: string, data: any) {
    console.log("hereeee : ", id);
    this.socketMap.get(id).forEach(socket => {
      socket.emit('notification', {
        type: data.type,
        message: data.message,
      });
      socket.emit("reload");
    });
  }
  @SubscribeMessage("friendRequest")
  // @UseGuards(AuthGuard("jwt"))
  async handleFriendRequest(client: Socket, data: any) {
    console.log("friend request : ", data);
    const token = client.handshake.headers.authorization?.split(" ")[1];

    const user: any = jwt_decode(token);
    const notification = await this.friendshipService.makeRequest(user.userId, data.receiverId);
    this.sendNotification(data.receiverId, notification);
    client.emit("notification", {type : "success", message : "Request sent"});
  }
}
