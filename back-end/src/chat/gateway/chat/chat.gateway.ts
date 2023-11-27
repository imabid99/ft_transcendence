
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


@WebSocketGateway({
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
  namespace: "chat",
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}
  @WebSocketServer()
  server: SocketIO.Server;

  private socketMap: Map<string, Socket[]> = new Map<string, Socket[]>();

  addUserSocket(userName: string, socket: Socket) {
    if (this.socketMap.has(userName)) {
      const sockets = this.socketMap.get(userName);
      sockets.push(socket);
      this.socketMap.set(userName, sockets);
    } else {
      this.socketMap.set(userName, [socket]);
    }
  }

  removeUserSocket(userName: string, socket: Socket) {
    if (this.socketMap.has(userName)) {
      const sockets = this.socketMap.get(userName);
      const index = sockets.indexOf(socket);
      if (index !== -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          this.socketMap.delete(userName);
        } else {
          this.socketMap.set(userName, sockets);
        }
      }
    }
  }

  getSocketsByUserName(userName: string): Socket[] {
    return this.socketMap.get(userName) || [];
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded: any = jwt_decode(token);
      try
      {
        const profile = await this.prisma.profile.findUnique({
          where: {
            userId: decoded.userId,
          },
        });
        if(!profile)
          return;
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
        this.addUserSocket(decoded.username, client);
        if ((this.server?.adapter as any)?.rooms?.get(decoded.username)?.size > 1){
          return;
        }
        await this.prisma.profile?.update({
          where: {
            userId: decoded?.userId,
          },
          data: {
            status: "online",
          },
        });
        this.server.emit("refresh");
      }
      catch(err){
        console.log("err : ", err.message);
      }
    }
  }

  async handleDisconnect(client: Socket) {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    const decoded: any = jwt_decode(token);
    try
    {
      const Profile = await this.prisma.profile.findUnique({
        where: {
          userId: decoded.userId,
        },
      });
      if ((this.server?.adapter as any)?.rooms?.get(decoded.username)?.size >= 1 || !Profile){
        return;
      }
      await this.prisma.profile.update({
        where: {
          userId: decoded.userId,
        },
        data: {
          status: "offline",
        },
      });
      this.removeUserSocket(decoded.username, client);
      this.server.emit("refresh");
    }
    catch(err){
      console.log("err : ", err.message);
    }
  }

  @SubscribeMessage("privet-message")
  async handlePrivetMessage(_client: Socket, payload: any): Promise<void> {
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
      receiver.id,
      sander.id
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
  async handleBlockUser(client: Socket, payload: any): Promise<void> {
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
  async handleUnblockUser(client: Socket, payload: any): Promise<void> {
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
  async handleCreateGroup(client: Socket, payload: any): Promise<void> {

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
        this.server.to(user.username).emit("errorNotif", {message: `you already have a group with this name`, type: false});
        return;
      }
      payload.groupUsers.push(user.id);
      const newChannel = await this.prisma.channels.create({
        data: {
          type: payload.groupType,
          name: payload.groupName,
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
        },
      });
      const channel:any = await this.prisma.channels.findUnique({
        where: {
          name: payload.groupName,
        },
        include: {
          Members: true,
        },
      });
      // console.log("channel : ", this.getSocketsByUserName(user.username).join(channel.id));
      channel.Members.map((member) => {
        const sockets = this.getSocketsByUserName(member.username);
        sockets.map((socket) => {
          socket.join(channel.id);
        });
      })

      newChannel && this.server.to(decoded.username).emit("update-groupAvatar", {groupId: channel.id});
      this.server.to(user.username).emit("errorNotif", {message: `group created`, type: true});
      this.server.emit("refresh");
    }
  }

  
  
  @SubscribeMessage("refresh-event")
  async handleRefresh(client: Socket, payload: any): Promise<void> {
    setTimeout(() => {
      this.server.emit("refresh");
    }, 150);
  }

  @SubscribeMessage("message-to-group")
  async handleMessageToGroup(client: Socket, payload: any): Promise<void>
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
        return member.id === user.id;
      }); 
      if (!verifyIsMemmber) {
        return;
      }
      const verifyMuts: boolean = group.Muts.some((mut) => {
        return mut.id === user.id;
      }); 
      if (verifyMuts) {
        const mut = await this.prisma.Muted.findMany({
          where: {
              userId: user.id,
              channelId: group.id,
          },
        });
        const date = new Date();
        const timeOffMute = new Date(mut[0].timeOffMute);
        if (timeOffMute <= date) {
          await this.prisma.Muted.delete({
            where: {
              id: mut[0].id,
            },
          });
          await this.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              channelsMuts: {
                disconnect: {
                  id: group.id,
                },
              },
            },
          });

        }
        else
        {
          this.server.to(user.username).emit("errorNotif", {message: `you are muted `, type: false});
          return;
        }
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === user.id;
      }); 
      if (verifyBand) {
        this.server.to(user.username).emit("errorNotif", {message: `you are banned from this group`, type: false});
        return;
      }
      
      await this.prisma.message.create({
        data: {
          fromName: user.username,
          content: payload.message.content,
          channelsId: group.id,
          Avatar: payload.message.Avatar,
        },
      });

      this.server.to(payload.groupId).emit("message-to-group", payload.message);
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("leaveGroup")
  async handleExitGroup(client: Socket, payload: any): Promise<void> {
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
        Muts: true,
      },
    });

    const verifyIsMemmber: boolean = group.Members.some((member) => {
      return member.id === user.id;
    }); 
    if (!verifyIsMemmber) {
      this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to leave this group`, type: false});
      return;
    }


      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      if (verifyOwner && group.Owners.length === 1) {
        if(group.Members.length !== 1)
        {
          let newOwner = group.Members[group.Members.length - 1];
          if (newOwner.id === user.id)
          {
            newOwner = group.Members[0];
          }
          await this.prisma.user.update({
            where: {
              id: newOwner.id,
            },
            data: {
              channelsOwner: {
                connect: {
                  id: group.id,
                },
              },
            },
          });

          await this.prisma.channels.update({
            where: {
              id: group.id,
            },
            data: {
              Owners: {
                disconnect: {
                  id: user.id,
                },
              },
              Members: {
                disconnect: {
                  id: user.id,
                },
              },
            },
          });
          this.server.to(user.username).emit("errorNotif", {message: `you left this group and a new owner is selected`, type: true});
        }
        else
        {
          await this.prisma.channels.delete({
            where: {
              id: group.id,
            },
          });
          this.server.to(user.username).emit("errorNotif", {message: `you left this group and it is deleted`, type: true});
        }
        this.server.emit("refresh");

        return;
      }
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === user.id;
      });
      const verifyMuts: boolean = group.Muts.some((mut) => {
        return mut.id === user.id;
      });
      if (verifyMuts)
      {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            channelsMuts: {
              disconnect: {
                id: payload.groupId,
              },
            },
          },
        });
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === user.id;
      });
      if (verifyBand)
      {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            channelsBand: {
              disconnect: {
                id: payload.groupId,
              },
            },
          },
        });
      }
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
      this.server.to(user.username).emit("errorNotif", {message: `you left this group`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("joinGroup")
  async handleJoinGroup(client: Socket, payload: any): Promise<void> {
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
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to join this group`, type: false});
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
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to join this group`, type: false});
        return;
      }

      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === user.id;
      });
      if (verifyIsMemmber) {
        this.server.to(user.username).emit("errorNotif", {message: `you are already a member of this group`, type: false});
        return;
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === user.id;
      });
      if (verifyBand) {
        this.server.to(user.username).emit("errorNotif", {message: `you are banned from this group`, type: false});
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
      const myClient = this.getSocketsByUserName(user.username);
      myClient.map((socket) => {
        socket.join(payload.groupId);
      });
      this.server.to(user.username).emit("errorNotif", {message: `you are now a member of this group`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("joinProtectedGroup")
  async handleJoinProtectedGroup(client: Socket, payload: any): Promise<void> {
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
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to join this group`, type: false});
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
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to join this group`, type: false});
        return;
      }

      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === user.id;
      });
      if (verifyIsMemmber) {
        this.server.to(user.username).emit("errorNotif", {message: `you are already a member of this group`, type: false});
        return;
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === user.id;
      });
      if (verifyBand) {
        this.server.to(user.username).emit("errorNotif", {message: `you are banned from this group`, type: false});
        return;
      }
      if (group.password !== payload.password) {
        this.server.to(user.username).emit("errorNotif", {message: `wrong password`, type: false});
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
      this.server.to(user.username).emit("errorNotif", {message: `you are now a member of this group`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("KickUser")
  async handleKickUser(client: Socket, payload: any): Promise<void> {
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
          Band: true,
          Muts: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === user.id;
      }); 
      if (!verifyIsMemmber) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to kick this user`, type: false});
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === user.id;
      });
      if (!verifyOwner && !verifyAdmin) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to kick this user`, type: false});
        return;
      }
      await this.prisma.user.update({
        where: {
          id: payload.userId,
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
        return admin.id === payload.userId;
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
      const verifyMuts: boolean = group.Muts.some((mut) => {
        return mut.id === payload.userId;
      });
      if (verifyMuts)
      {
        await this.prisma.user.update({
          where: {
            id: payload.userId,
          },
          data: {
            channelsMuts: {
              disconnect: {
                id: group.id,
              },
            },
          },
        });

        await this.prisma.Muted.delete({
          where: {
            userId: payload.userId,
            channelId: group.id,
          },
        });
        
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === payload.userId;
      });
      if (verifyBand)
      {
        await this.prisma.user.update({
          where: {
            id: payload.userId,
          },
          data: {
            channelsBand: {
              disconnect: {
                id: group.id,
              },
            },
          },
        });
      }
      this.server.to(user.username).emit("errorNotif", {message: `this user is kicked`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("SetAdmin")
  async handleSetAdmin(client: Socket, payload: any): Promise<void> {
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
        return member.id === user.id;
      }); 
      if (!verifyIsMemmber) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to set this user as admin`, type: false});
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      if (!verifyOwner) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to set this user as admin`, type: false});
        return;
      }
      await this.prisma.user.update({
        where: {
          id: payload.userId,
        },
        data: {
          channelsAdmin: {
            connect: {
              id: group.id,
            },
          },
        },
      });
      this.server.to(user.username).emit("errorNotif", {message: `this user is now an admin`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("BanUser")
  async handleBanUser(client: Socket, payload: any): Promise<void> {
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
          Muts: true,
          Band: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === user.id;
      }); 
      if (!verifyIsMemmber) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to ban this user`, type: false});
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === user.id;
      });
      if (!verifyOwner && !verifyAdmin) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to ban this user`, type: false});
        return;
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === payload.userId;
      }
      );
      
      if (verifyBand)
      {
        this.server.to(user.username).emit("errorNotif", {message: `this user is already banned`, type: false});
        return;
      }
      const verifyAdmin2: boolean = group.Admins.some((admin) => {
        return admin.id === payload.userId;
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

      const verifyMuts: boolean = group.Muts.some((mut) => {
        return mut.id === payload.userId;
      });
      if (verifyMuts)
      {
        await this.prisma.user.update({
          where: {
            id: payload.userId,
          },
          data: {
            channelsMuts: {
              disconnect: {
                id: group.id,
              },
            },
          },
        });

        await this.prisma.Muted.delete({
          where: {
            userId: payload.userId,
            channelId: group.id,
          },
        });
      }

      await this.prisma.user.update({
        where: {
          id: payload.userId,
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
          id: payload.userId,
        },
        data: {
          channelsBand: {
            connect: {
              id: group.id,
            },
          },
        },
      });
      this.server.to(user.username).emit("errorNotif", {message: `this user is banned`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("UnBanUser")
  async handleUnBanUser(client: Socket, payload: any): Promise<void> {
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
          Band: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === user.id;
      }); 
      if (!verifyIsMemmber) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to unban this user`, type: false});
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === user.id;
      });
      if (!verifyOwner && !verifyAdmin) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to unban this user`, type: false});
        return;
      }
      const verifyBand: boolean = group.Band.some((ban) => {
        return ban.id === payload.userId;
      });
      if (!verifyBand)
      {
        this.server.to(user.username).emit("errorNotif", {message: `this user is not banned`, type: false});
        return;
      }

      await this.prisma.user.update({
        where: {
          id: payload.userId,
        },
        data: {
          channelsBand: {
            disconnect: {
              id: group.id,
            },
          },
        },
      });
      this.server.to(user.username).emit("errorNotif", {message: `this user is unbanned`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("MuteUser")
  async handleMuteUser(client: Socket, payload: any): Promise<void> {
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
          Muts: true,
        },
      });
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === user.id;
      }); 
      if (!verifyIsMemmber) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to mute this user`, type: false});
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === user.id;
      });
      if (!verifyOwner && !verifyAdmin) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to mute this user`, type: false});
        return;
      }
      const verifyMuts: boolean = group.Muts?.some((mut) => {
        return mut.id === payload.userId;
      });
      if (verifyMuts)
      {
        this.server.to(user.username).emit("errorNotif", {message: `this user is already muted`, type: false});
        return;
      }

      await this.prisma.user.update({
        where: {
          id: payload.userId,
        },
        data: {
          channelsMuts: {
            connect: {
              id: group.id,
            },
          },
        },
      });
      await this.prisma.Muted.create({
        data: {
          userId: payload.userId,
          channelId: payload.groupId,
          timeOffMute: payload.timeOffMute,
        },
      });
      this.server.to(user.username).emit("errorNotif", {message: `this user is muted`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("UnMuteUser")
  async handleUnMuteUser(client: Socket, payload: any): Promise<void> {
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
      const muts = await this.prisma.Muted.findMany({
        where: {
          userId: payload.userId,
          channelId: payload.groupId,
        },
      });
      if (muts.length === 0)
      {
        this.server.to(user.username).emit("errorNotif", {message: `this user is not muted`, type: false});
        return;
      }
      const verifyIsMemmber: boolean = group.Members.some((member) => {
        return member.id === user.id;
      }); 
      if (!verifyIsMemmber) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to unmute this user`, type: false});
        return;
      }

      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      const verifyAdmin: boolean = group.Admins.some((admin) => {
        return admin.id === user.id;
      });
      if (!verifyOwner && !verifyAdmin) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to unmute this user`, type: false});
        return;
      }
      await this.prisma.user.update({
        where: {
          id: payload.userId,
        },
        data: {
          channelsMuts: {
            disconnect: {
              id: group.id,
            },
          },
        },
      });
      await this.prisma.Muted.delete({
        where: {
          id: muts[0].id,
        },
      });
      this.server.to(user.username).emit("errorNotif", {message: `this user is unmuted`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("removeGroupPass")
  async handleRemoveGroupPass(client: Socket, payload: any): Promise<void> {
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
          Owners: true,
        },
      });
      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      if (!verifyOwner) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to remove this group password`, type: false});
        return;
      }
      if(group.type === "public")
      {
        this.server.to(user.username).emit("errorNotif", {message: `this group already public`, type: false});
        return;
      }
      await this.prisma.channels.update({
        where: {
          id: payload.groupId,
        },
        data: {
          password: "",
          type: "public",
        },
      });
      this.server.to(user.username).emit("errorNotif", {message: `group password removed`, type: true});
      this.server.emit("refresh");
    }
  }

  @SubscribeMessage("setGroupPass")
  async handleSetGroupPass(client: Socket, payload: any): Promise<void> {
    const token = client.handshake.headers.authorization?.split(" ")[1];
    if(token)
    {
      const info:any= jwt_decode(token);
      const user = await this.prisma.user.findUnique({
        where: {
          id: info.userId,
        },
      });

      const group = await this.prisma.channels.findUnique({
        where: {
          id: payload.groupId,
        },
        include: {
          Owners: true,
        },
      });
      const verifyOwner: boolean = group.Owners.some((owner) => {
        return owner.id === user.id;
      });
      if (!verifyOwner) {
        this.server.to(user.username).emit("errorNotif", {message: `you are not allowed to set this group password`, type: false});
        return;
      }
      await this.prisma.channels.update({
        where: {
          id: payload.groupId,
        },
        data: {
          password: payload.password,
          type: "protected",
        },
      });
      this.server.to(user.username).emit("errorNotif", {message: `group password set`, type: true});
      this.server.emit("refresh");
    }
  }
}
