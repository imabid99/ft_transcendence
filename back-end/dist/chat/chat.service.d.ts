import { PrismaService } from "../prisma/prisma.service";
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    getChannel(myId: string, channelId: string): Promise<any>;
    getMessages(id: string): Promise<any>;
    getMyChannels(id: string): Promise<any>;
    getChannels(id: number): Promise<any>;
    checkMute(id: number, channelId: string): Promise<any>;
}
