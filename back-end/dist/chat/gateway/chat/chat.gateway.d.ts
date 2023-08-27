import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "socket.io";
import * as SocketIO from "socket.io";
import { PrismaService } from "../../../prisma/prisma.service";
import { UserService } from "../../../user.service";
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    private userService;
    constructor(prisma: PrismaService, userService: UserService);
    server: SocketIO.Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handlePrivetMessage(_client: any, payload: any): Promise<void>;
    handleBlockUser(client: any, payload: any): Promise<void>;
    handleUnblockUser(client: any, payload: any): Promise<void>;
    handleCreateGroup(client: any, payload: any): Promise<void>;
    handleRefresh(client: any, payload: any): Promise<void>;
    handleMessageToGroup(client: any, payload: any): Promise<void>;
    handleExitGroup(client: any, payload: any): Promise<void>;
    handleKickUser(client: any, payload: any): Promise<void>;
}
