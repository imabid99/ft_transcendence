import { ChatService } from "./chat.service";
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    channel(id: string, headers: any): Promise<any>;
    messages(params: any): Promise<any>;
    myChannels(id: string): Promise<any>;
    channels(headers: any): Promise<any>;
    isMute(userId: string, groupId: string): Promise<{
        iMute: boolean;
        heMute: boolean;
    }>;
}
