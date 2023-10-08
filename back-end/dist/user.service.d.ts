import { PrismaService } from "./prisma/prisma.service";
import { chPass } from "./dtos/pass.dto";
import * as jwt from "jsonwebtoken";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    checkMute(arg0: number, groupId: string): {
        iMute: boolean;
        heMute: boolean;
    } | PromiseLike<{
        iMute: boolean;
        heMute: boolean;
    }>;
    getUsers(): Promise<import(".prisma/client").User[]>;
    getProfiles(): Promise<import(".prisma/client").Profile[]>;
    generateToken(userId: string, username: string, email: string): string;
    changePass(pass: chPass, id: string): Promise<void>;
    intraJWT(email: string): Promise<string>;
    googleJWT(email: string): Promise<string>;
    validateUser(data: any): Promise<import(".prisma/client").User>;
    getProfile(id: string): Promise<import(".prisma/client").Profile>;
    validateJwtToken(token: string): Promise<string | jwt.JwtPayload>;
    validateIntraUser(user: any): Promise<any>;
    validateGoogleUser(user: any): Promise<any>;
    isBlocked(id: string, userId: string): Promise<{
        iBlocked: boolean;
        heBlocked: boolean;
    }>;
    getUserInfo(id: string): Promise<any>;
}
