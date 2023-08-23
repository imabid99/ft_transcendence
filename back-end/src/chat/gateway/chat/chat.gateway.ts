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
import { UserService } from "../../../user.service";
import { Inject } from "@nestjs/common";
import { use } from "passport";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:1337",
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
    console.log("connected : ");
    if (client.handshake.headers.refresh) {
      return;
    }
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt_decode(token);
      client.join(decoded.username);
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
      console.log("connected : ", decoded.username);
      const refresh = {
        nothis: new Date().getMilliseconds(),
      };
      this.server.emit("refresh", refresh);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async handleDisconnect(client: Socket) {
    if (client.handshake.headers.refresh) {
      return;
    }
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt_decode(token);
      if (this.server.sockets.adapter.rooms.get(decoded.username) !== undefined)
        return;
      console.log(
        "disconnected : ",
        this.server.sockets.adapter.rooms.get(decoded.username)
      );
      await this.prisma.profile.update({
        where: {
          userId: decoded.userId,
        },
        data: {
          status: "offline",
        },
      });
      const refresh = {
        nothis: new Date().getMilliseconds(),
      };
      this.server.emit("refresh", refresh);
    }
  }

  @SubscribeMessage("message")
  handleMessage(_client: any, payload: any): string {
    this.server.emit("message", payload);
    return "Hello world!";
  }

  @SubscribeMessage("join-private-room")
  handleJoinPrivateRoom(client: any, payload: any): string {
    client.join(payload.room);
    return "Hello world!";
  }

  @SubscribeMessage("privet-message")
  async handlePrivetMessage(_client: any, payload: any): Promise<void> {
    const receiver = await this.prisma.user.findUnique({
      where: {
        username: payload.room,
      },
    });
    const sander = await this.prisma.user.findUnique({
      where: {
        username: payload.sander,
      },
    });
    const verifyBlock = await this.userService.isBlocked(
      receiver.id.toString(),
      sander.id.toString()
    );
    if (verifyBlock.iBlocked || verifyBlock.heBlocked) {
      return;
    }
    await this.prisma.message.create({
      data: {
        fromId: sander.id,
        toId: receiver.id,
        content: payload.message.content,
        userId: sander.id,
      },
    });
    await this.prisma.message.create({
      data: {
        fromId: sander.id,
        toId: receiver.id,
        content: payload.message.content,
        userId: receiver.id,
      },
    });
    const refresh = {
      nothis: new Date().getMilliseconds(),
    };
    this.server.to(payload.room).emit("privet-message", payload.message);
    this.server.to(payload.sander).emit("privet-message", payload.message);
    this.server.emit("refresh", refresh);
  }
  @SubscribeMessage("block-user")
  async handleBlockUser(client: any, payload: any): Promise<void> {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log("verified : ", verified);
    } catch (err) {
      console.log("verified : ", err.message);
      return;
    }
    if (token) {
      await this.prisma.BlockList.create({
        data: {
          userId: payload.userId,
          blockedId: payload.blockedId,
        },
      });
      const refresh = {
        nothis: new Date().getMilliseconds(),
      };
      this.server.emit("refresh", refresh);
    }
  }
  @SubscribeMessage("unblock-user")
  async handleUnblockUser(client: any, payload: any): Promise<void> {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log("err : ", err.message);
      return;
    }
    if (token) {
      const userList = await this.prisma.BlockList.findMany({
        where: {
          userId: payload.userId,
        },
      });
      userList.map(async (blockTable) => {
        if (blockTable.blockedId === payload.blockedId) {
          await this.prisma.BlockList.delete({
            where: {
              id: blockTable.id,
            },
          });
        }
      });
      const refresh = {
        nothis: new Date(),
      };
      this.server.emit("refresh", refresh);
      console.log("refresh : ", refresh.nothis);
    }
  }

  @SubscribeMessage("create-group")
  async handleCreateGroup(client: any, payload: any): Promise<void> {
    console.log("create-group : ", payload.groupUsers);
    const token = client.handshake.headers.authorization?.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log("err : ", err.message);
      return;
    }
    if (token) {
      const decoded: any = jwt_decode(token);
      const user = await this.prisma.user.findUnique({
        where: {
          username: decoded.username,
        },
      });
      delete user.password;
      payload.groupUsers.push(user.id);
      const newGroup = await this.prisma.channels.create({
        data: {
          type: payload.groupType,
          name: payload.groupName,
          accessPassword: payload.accessPassword,
          password: payload.protectedPassword,
          userId: user.id,
          Members: {
            connect: payload.groupUsers.map((id) => ({ id })),
          },
          Owners: {
            connect: {
              id: user.id,
            },
          },
          avatar: "",
        },
      });
      console.log("newGroup : ", newGroup);
    }
  }

  // @SubscribeMessage("join-users-channel")
  // async handleJoinUsersGroup(client: any, payload: any): Promise<void> {
  //   const token = client.handshake.headers.authorization?.split(" ")[1];
  //   if (token) {
  //     const decoded: any = jwt_decode(token);
  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         username: decoded.username,
  //       },
  //     });
  //     await this.prisma.group.findUnique({
  //       where: {
  //         id: payload.id,
  //       },
  //     });
  //     const newGroup = await this.prisma.group.update({
  //       where: {
  //         id: payload.id,
  //       },
  //       data: {
  //         users: {
  //           connect: {
  //             id: user.id,
  //           },
  //         },
  //       },
  //     });
  //     this.server.emit("join-users-group", newGroup);
  //   }
  // }

  @SubscribeMessage("refresh")
  async handleRefresh(client: any, payload: any): Promise<void> {
    const jwt = client.handshake.headers.authorization?.split(" ")[1];
    if (jwt) {
      console.log("payload : ", payload);
      const refresh = {
        nothis: new Date().getMilliseconds(),
      };
      this.server.emit("refresh", refresh);
    }
  }
}
