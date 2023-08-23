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
        console.log("connected : ");
        if (client.handshake.headers.refresh) {
            return;
        }
        const token = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            const decoded = (0, jwt_decode_1.default)(token);
            client.join(decoded.username);
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
            console.log("connected : ", decoded.username);
            const refresh = {
                nothis: new Date().getMilliseconds(),
            };
            this.server.emit("refresh", refresh);
        }
    }
    async handleDisconnect(client) {
        var _a;
        if (client.handshake.headers.refresh) {
            return;
        }
        const token = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            const decoded = (0, jwt_decode_1.default)(token);
            if (this.server.sockets.adapter.rooms.get(decoded.username) !== undefined)
                return;
            console.log("disconnected : ", this.server.sockets.adapter.rooms.get(decoded.username));
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
    handleMessage(_client, payload) {
        this.server.emit("message", payload);
        return "Hello world!";
    }
    handleJoinPrivateRoom(client, payload) {
        client.join(payload.room);
        return "Hello world!";
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
            nothis: new Date().getMilliseconds(),
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
                nothis: new Date().getMilliseconds(),
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
                nothis: new Date(),
            };
            this.server.emit("refresh", refresh);
            console.log("refresh : ", refresh.nothis);
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
    async handleRefresh(client, payload) {
        var _a;
        const jwt = (_a = client.handshake.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (jwt) {
            console.log("payload : ", payload);
            const refresh = {
                nothis: new Date().getMilliseconds(),
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
    (0, websockets_1.SubscribeMessage)("message"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("join-private-room"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], ChatGateway.prototype, "handleJoinPrivateRoom", null);
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