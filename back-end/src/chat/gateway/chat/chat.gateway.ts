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
import { subscribe } from "diagnostics_channel";


@WebSocketGateway({
  cors: {
    origin: "*",
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
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

    this.server.to(payload.room).emit("privet-message", payload.message);
    this.server.to(payload.sander).emit("privet-message", payload.message);
    this.server.emit("refresh");
  }
  
  @SubscribeMessage("block-user")
  async handleBlockUser(client: any, payload: any): Promise<void> {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return;
    }
    if (token) {
      await this.prisma.BlockList.create({
        data: {
          userId: payload.userId,
          blockedId: payload.blockedId,
        },
      });
      this.server.emit("refresh");
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
      this.server.emit("refresh");

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
      const verifyName = await this.prisma.channels.findMany({
        where: {
          name: payload.groupName,
        },
      });
      if (verifyName[0]) {
        console.log("create-group : ", payload.groupName, " is exist");
        return;
      }

      payload.groupUsers.push(user.id);
      await this.prisma.channels.create({
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
          accessIsActived : payload.accessPassword? true : false,
        },
      });
      this.server.emit("refresh");
      const channel:any = await this.prisma.channels.findUnique({
        where: {
          name: payload.groupName,
        },
        include: {
          Members: true,
        },
      });
      console.log("channel : ", channel);
      channel.Members.map((member) => {
       const userSocket = this.server.sockets.adapter.rooms.get(member.username);
        if(userSocket)
        {
          userSocket.forEach((socketId) => { 
            this.server.sockets.sockets.get(socketId).join(channel.id);
          });
        }

      }
      );
    }
  }

  
  
  @SubscribeMessage("refresh")
  async handleRefresh(client: any, payload: any): Promise<void> {
    const jwt = client.handshake.headers.authorization?.split(" ")[1];
    if (jwt) {
      console.log("refresh : ", "done");
      this.server.emit("refresh", payload);
    }
  }
  @SubscribeMessage("message-to-group")
  async handleMessageToGroup(client: any, payload: any): Promise<void>
  {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const info:any= jwt_decode(token);
      const user = await this.prisma.user.findUnique({
        where: {
          id: info?.userId,
        },
      });
      const group = await this.prisma.channels.findUnique({
        where: {
          id: payload.groupId,
        },
        include: {
          Members: true,
          Muts: true,
          Band: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === +user.id;
      }); 
      if (!verifyIsMemmber) {
        return;
      }
      const verifyMuts: boolean = group.Muts.some((mut) => {
        return mut.id === +user.id;
      }); 
      if (verifyMuts) {
        return;
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === +user.id;
      }); 
      if (verifyBand) {
        return;
      }
      await this.prisma.message.create({
        data: {
          fromName: user.username,
          content: payload.message.content,
          channelsId: group.id,
        },
      });

      console.log("sockets id in room : ", this.server.sockets.adapter.rooms.get(payload.groupId));
      this.server.to(payload.groupId).emit("message-to-group", payload.message);
      console.log("message-to-group : ", payload.message.content , " to : ", payload.groupId);
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("leaveGroup")
  async handleExitGroup(client: any, payload: any): Promise<void> {
  const jwt = client.handshake.headers.authorization?.split(" ")[1];
  if(jwt)
  {
    const info:any= jwt_decode(jwt);
    const user = await this.prisma.user.findUnique({
      where: {
        id: info?.userId,
      },
    });
    const group = await this.prisma.channels.findUnique({
      where: {
        id: payload.groupId,
      },
      include: {
        Members: true,
        Band: true,
        Owners: true,
        Admins: true,
      },
    });

    const verifyIsMemmber: boolean = group.Members.some((member) => {
      return member.id === +user.id;
    }); 
    if (!verifyIsMemmber) {
      return;
    }


      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === +user.id;
      });
      if (verifyOwner && group.Owners.length === 1) {
        return;
      }
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === +user.id;
      });

    if (verifyAdmin)
    {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          channelsAdmin: {
            disconnect: {
              id: payload.groupId,
            },
          },
        },
      });
    }

    if (verifyOwner)
    {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          channelsOwner: {
            disconnect: {
              id: payload.groupId,
            },
          },
        },
      });
    }
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        channels: {
          disconnect: {
            id: payload.groupId,
          },
        },
        channelsMember:{
          disconnect: {
            id: payload.groupId,
          },
        }
      },
    });
    this.server.emit("refresh");
  }
  }

  @SubscribeMessage("joinGroup")
  async handleJoinGroup(client: any, payload: any): Promise<void> {
    const jwt = client.handshake.headers.authorization?.split(" ")[1];
    if(jwt)
    {
      const info:any= jwt_decode(jwt);
      const user = await this.prisma.user.findUnique({
        where: {
          id: info?.userId,
        },
      });
      if (user.id !== payload.userId) {
        console.log("joinGroup : ", "user.id !== payload.userId");
        return;
      }
      const group = await this.prisma.channels.findUnique({
        where: {
          id: payload.groupId,
        },
        include: {
          Members: true,
          Band: true,
          Owners: true,
          Admins: true,
        },
      });
      if (group.type === "private") {
        console.log("joinGroup : ", "group.type === private");
        return;
      }

      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === +user.id;
      });
      if (verifyIsMemmber) {
        console.log("joinGroup : ", "verifyIsMemmber");
        return;
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === +user.id;
      });
      if (verifyBand) {
        console.log("joinGroup : ", "verifyBand");
        return;
      }
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          channels: {
            connect: {
              id: payload.groupId,
            },
          },
          channelsMember:{
            connect: {
              id: payload.groupId,
            },
          }
        },
      });
      this.server.emit("refresh");
      console.log("joinGroup : ", "done");
    }
  }

  @SubscribeMessage("KickUser")
  async handleKickUser(client: any, payload: any): Promise<void> {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if(token)
    {
      const info:any= jwt_decode(token);
      const user = await this.prisma.user.findUnique({
        where: {
          id: info?.userId,
        },
      });
      const group = await this.prisma.channels.findUnique({
        where: {
          id: payload.groupId,
        },
        include: {
          Members: true,
          Owners: true,
          Admins: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === +user.id;
      }); 
      if (!verifyIsMemmber) {
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === +user.id;
      });
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === +user.id;
      });
      if (!verifyOwner && !verifyAdmin) {
        return;
      }
      await this.prisma.user.update({
        where: {
          id: +payload.userId,
        },
        data: {
          channels: {
            disconnect: {
              id: group.id,
            },
          },
          channelsMember:{
            disconnect: {
              id: group.id,
            },
          }
        },
      });

      const verifyAdmin2: boolean = group.Admins.some((admin) => {
        return admin.id === +payload.userId;
      });
      if (verifyAdmin2)
      {
        await this.prisma.user.update({
          where: {
            id: payload.userId,
          },
          data: {
            channelsAdmin: {
              disconnect: {
                id: group.id,
              },
            },
          },
        });
      }

      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("SetAdmin")
  async handleSetAdmin(client: any, payload: any): Promise<void> {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if(token)
    {
      const info:any= jwt_decode(token);
      const user = await this.prisma.user.findUnique({
        where: {
          id: info?.userId,
        },
      });
      const group = await this.prisma.channels.findUnique({
        where: {
          id: payload.groupId,
        },
        include: {
          Members: true,
          Owners: true,
          Admins: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === +user.id;
      }); 
      if (!verifyIsMemmber) {
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === +user.id;
      });
      if (!verifyOwner) {
        return;
      }
      await this.prisma.user.update({
        where: {
          id: +payload.userId,
        },
        data: {
          channelsAdmin: {
            connect: {
              id: group.id,
            },
          },
        },
      });
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("BanUser")
  async handleBanUser(client: any, payload: any): Promise<void> {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if(token)
    {
      const info:any= jwt_decode(token);
      const user = await this.prisma.user.findUnique({
        where: {
          id: info?.userId,
        },
      });
      const group = await this.prisma.channels.findUnique({
        where: {
          id: payload.groupId,
        },
        include: {
          Members: true,
          Owners: true,
          Admins: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === +user.id;
      }); 
      if (!verifyIsMemmber) {
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === +user.id;
      });
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === +user.id;
      });
      if (!verifyOwner && !verifyAdmin) {
        return;
      }

      //check if userid is  admin
      const verifyAdmin2: boolean = group.Admins.some((admin) => {
        return admin.id === +payload.userId;
      });
      if (verifyAdmin2)
      {
        await this.prisma.user.update({
          where: {
            id: payload.userId,
          },
          data: {
            channelsAdmin: {
              disconnect: {
                id: group.id,
              },
            },
          },
        });
      }
      await this.prisma.user.update({
        where: {
          id: +payload.userId,
        },
        data: {
          channels: {
            disconnect: {
              id: group.id,
            },
          },
          channelsMember:{
            disconnect: {
              id: group.id,
            },
          }
        },
      });
      await this.prisma.user.update({
        where: {
          id: +payload.userId,
        },
        data: {
          channelsBand: {
            connect: {
              id: group.id,
            },
          },
        },
      });
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("UnBanUser")
  async handleUnBanUser(client: any, payload: any): Promise<void> {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if(token)
    {
      const info:any= jwt_decode(token);
      const user = await this.prisma.user.findUnique({
        where: {
          id: info?.userId,
        },
      });
      const group = await this.prisma.channels.findUnique({
        where: {
          id: payload.groupId,
        },
        include: {
          Members: true,
          Owners: true,
          Admins: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === +user.id;
      }); 
      if (!verifyIsMemmber) {
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === +user.id;
      });
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === +user.id;
      });
      if (!verifyOwner && !verifyAdmin) {
        return;
      }
      await this.prisma.user.update({
        where: {
          id: +payload.userId,
        },
        data: {
          channelsBand: {
            disconnect: {
              id: group.id,
            },
          },
        },
      });
      this.server.emit("refresh");
    }
  }
  //mute user for a limited time

}
