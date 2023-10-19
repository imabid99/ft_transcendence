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
const jwt_decode_1 = require("jwt-decode");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_service_1 = require("../../user.service");
let ChatGateway = exports.ChatGateway = class ChatGateway {
    constructor(prisma, userService) {
        this.prisma = prisma;
        this.userService = userService;
    }
    async handleConnection(client) {
        var _a, _b;
        console.log("client  √");
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
            this.server.emit("refresh");
        }
    }
    async handleDisconnect(client) {
        var _a;
        console.log("Disconnect  √");
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
            this.server.emit("refresh");
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", SocketIO.Server)
], ChatGateway.prototype, "server", void 0);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: true,
            methods: ["GET", "POST"],
        },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], ChatGateway);
//# sourceMappingURL=game.gateway.js.map