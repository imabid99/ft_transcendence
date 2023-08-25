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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const SocketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const jwt_decode_1 = require("jwt-decode");
const prisma_service_1 = require("../../../prisma/prisma.service");
const user_service_1 = require("../../../user.service");
let ChatGateway = exports.ChatGateway = class ChatGateway {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async handleConnection(client) {
        var _a, _b;
        const token = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            const decoded = (0, jwt_decode_1.default)(token);
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
            if (((_b = this.server.sockets.adapter.rooms.get(decoded.username)) === null || _b === void 0 ? void 0 : _b.size) !== 1) {
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
            console.log("myChannels : ", client.rooms);
            const refresh = {
                nothing: new Date().getMilliseconds(),
            };
            this.server.emit("refresh", refresh);
        }
    }
    async handleDisconnect(client) {
        var _a;
        const token = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            const decoded = (0, jwt_decode_1.default)(token);
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
            const refresh = {
                nothing: new Date().getMilliseconds(),
            };
            this.server.emit("refresh", refresh);
        }
    }
    async handlePrivetMessage(_client, payload) {
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
        const verifyBlock = await this.userService.isBlocked(receiver.id.toString(), sander.id.toString());
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
            nothing: new Date().getMilliseconds(),
        };
        this.server.to(payload.room).emit("privet-message", payload.message);
        this.server.to(payload.sander).emit("privet-message", payload.message);
        this.server.emit("refresh", refresh);
    }
    async handleBlockUser(client, payload) {
        var _a;
        const token = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            console.log("verified : ", verified);
        }
        catch (err) {
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
                nothing: new Date().getMilliseconds(),
            };
            this.server.emit("refresh", refresh);
        }
    }
    async handleUnblockUser(client, payload) {
        var _a;
        const token = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
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
                nothing: new Date(),
            };
            this.server.emit("refresh", refresh);
            console.log("refresh : ", refresh.nothing);
        }
    }
    async handleCreateGroup(client, payload) {
        var _a;
        console.log("create-group : ", payload.groupUsers);
        const token = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            console.log("err : ", err.message);
            return;
        }
        if (token) {
            const decoded = (0, jwt_decode_1.default)(token);
            const user = await this.prisma.user.findUnique({
                where: {
                    username: decoded.username,
                },
            });
            delete user.password;
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
                    accessIsActived: payload.accessPassword ? true : false,
                },
            });
            const refresh = {
                nothing: new Date(),
            };
            this.server.emit("refresh", refresh);
        }
    }
    async handleRefresh(client, payload) {
        var _a;
        const jwt = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (jwt) {
            console.log("payload : ", payload);
            const refresh = {
                nothing: new Date().getMilliseconds(),
            };
            this.server.emit("refresh", refresh);
        }
    }
    async handleMessageToGroup(client, payload) {
        var _a;
        const token = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            const info = (0, jwt_decode_1.default)(token);
            const user = await this.prisma.user.findUnique({
                where: {
                    id: info === null || info === void 0 ? void 0 : info.userId,
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
            const verifyIsMemmber = group.Members.some((member) => {
                return member.id === +user.id;
            });
            if (!verifyIsMemmber) {
                return;
            }
            const verifyMuts = group.Muts.some((mut) => {
                return mut.id === +user.id;
            });
            if (verifyMuts) {
                return;
            }
            const verifyBand = group.Band.some((ban) => {
                return ban.id === +user.id;
            });
            if (verifyMuts) {
                return;
            }
            await this.prisma.message.create({
                data: {
                    fromName: user.username,
                    content: payload.message.content,
                    channelsId: group.id,
                },
            });
            const refresh = {
                nothing: new Date().getMilliseconds(),
            };
            console.log("sockets id in room : ", this.server.sockets.adapter.rooms.get(payload.groupId));
            this.server.to(payload.groupId).emit("message-to-group", payload.message);
            console.log("message-to-group : ", payload.message.content, " to : ", payload.groupId);
            this.server.emit("refresh", refresh);
        }
    }
    async handleExitGroup(client, payload) {
        var _a;
        const jwt = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (jwt) {
            const info = (0, jwt_decode_1.default)(jwt);
            const user = await this.prisma.user.findUnique({
                where: {
                    id: info === null || info === void 0 ? void 0 : info.userId,
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
            const verifyIsMemmber = group.Members.some((member) => {
                return member.id === +user.id;
            });
            if (!verifyIsMemmber) {
                return;
            }
            const verifyMuts = group.Muts.some((mut) => {
                return mut.id === +user.id;
            });
            if (verifyMuts) {
                return;
            }
            const verifyBand = group.Band.some((ban) => {
                return ban.id === +user.id;
            });
            if (verifyBand) {
                return;
            }
            await this.prisma.channels.update({
                where: {
                    id: payload.groupId,
                },
                data: {
                    Members: {
                        disconnect: {
                            id: user.id,
                        },
                    },
                },
            });
            const refresh = {
                nothing: new Date().getMilliseconds(),
            };
            this.server.emit("refresh", refresh);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", SocketIO.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("privet-message"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handlePrivetMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("block-user"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleBlockUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("unblock-user"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleUnblockUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("create-group"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleCreateGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("refresh"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleRefresh", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("message-to-group"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessageToGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveGroup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleExitGroup", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "http://localhost:1337",
            methods: ["GET", "POST"],
        },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map