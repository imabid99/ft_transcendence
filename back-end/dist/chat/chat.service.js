"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChatService = exports.ChatService = class ChatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getChannel(myId, channelId) {
        const channel = await this.prisma.channels.findUnique({
            where: {
                id: channelId,
            },
            include: {
                Members: true,
                Owners: true,
                Admins: true,
                Messages: true,
                Band: true,
                Muts: true,
            },
        });
        const isMumber = channel.Members.some((member) => {
            return member.id === +myId;
        });
        if (!isMumber) {
            throw new common_1.NotFoundException("Channel not found");
        }
        delete channel.password;
        delete channel.accessPassword;
        const isAdmin = channel.Admins.some((admin) => {
            return admin.id === +myId;
        });
        const isOwner = channel.Owners.some((owner) => {
            return owner.id === +myId;
        });
        if (!isAdmin && !isOwner) {
            delete channel.Band;
            delete channel.Muts;
        }
        return channel;
    }
    async getMessages(id) {
        const messages = await this.prisma.message.findMany({
            where: {
                userId: +id,
            },
        });
        return messages;
    }
    async getMyChannels(id) {
        const channels = await this.prisma.channels.findMany({
            where: {
                Members: {
                    some: {
                        id: +id,
                    },
                },
            },
            include: {
                Messages: true,
            }
        });
        channels.forEach((channel) => {
            delete channel.password;
            delete channel.accessPassword;
        });
        return channels;
    }
    async getChannels(id) {
        const channels = await this.prisma.channels.findMany({
            include: {
                Members: true,
            }
        });
        const publicChannels = channels.filter((channel) => {
            return channel.type !== "private";
        }).filter((channel) => {
            var _a;
            const isMumber = (_a = channel.Members) === null || _a === void 0 ? void 0 : _a.some((member) => {
                return member.id === id;
            });
            return isMumber === false ? channel : null;
        });
        publicChannels.forEach((channel) => {
            delete channel.password;
            delete channel.accessPassword;
            delete channel.Members;
        });
        return publicChannels;
    }
    async checkMute(id, channelId) {
        const channel = await this.prisma.channels.findUnique({
            where: {
                id: channelId,
            },
            include: {
                Members: true,
                Band: true,
            },
        });
        const isMumber = channel.Members.some((member) => {
            return member.id === id;
        });
        if (!isMumber) {
            throw new common_1.NotFoundException("Channel not found");
        }
        const isMute = channel.Band.some((member) => {
            return member.id === id;
        });
        if (isMute) {
            const mut = await this.prisma.Muted.findMany({
                where: {
                    userId: id,
                    channelId: channelId,
                },
            });
            const timeNow = new Date();
            const timeOffMute = new Date(mut[0].timeOffMute);
            if (mut[0] && timeNow < timeOffMute) {
                return true;
            }
            await this.prisma.Muted.deleteMany({
                where: {
                    userId: id,
                    channelId: channelId,
                },
            });
        }
        return false;
    }
};
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map