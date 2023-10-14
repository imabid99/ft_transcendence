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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let UserService = exports.UserService = class UserService {
    checkMute(arg0, groupId) {
        throw new Error("Method not implemented.");
    }
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers() {
        const users = await this.prisma.user.findMany();
        users.forEach((user) => {
            delete user.password;
        });
        return users;
    }
    async getProfiles() {
        const profiles = await this.prisma.profile.findMany();
        return profiles;
    }
    async addUser(userData) {
        let exist = await this.prisma.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (!exist) {
            exist = await this.prisma.user.findUnique({
                where: {
                    username: userData.username,
                },
            });
        }
        if (!exist) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(userData.password, salt);
            await this.prisma.user.create({
                data: {
                    username: userData.username,
                    email: userData.email,
                    password: hash,
                    profile: {
                        create: {
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email,
                            username: userData.username,
                        },
                    },
                },
            });
            return "User created";
        }
        else {
            return "user exist";
        }
    }
    generateToken(userId, username, email) {
        const token = jwt.sign({ userId, username, email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return token;
    }
    async login(userData) {
        let user;
        if (userData.email) {
            user = await this.prisma.user.findUnique({
                where: { email: userData.email },
            });
        }
        if (user) {
            const valid = await bcrypt.compare(userData.password, user.password);
            if (valid)
                return this.generateToken(user.id, user.username, user.email);
            else {
                return "invalid password";
            }
        }
        else {
            throw "invalid creds";
        }
    }
    async changePass(pass, id) {
        const user = await this.prisma.user.findUnique({ where: { id: +id } });
        const valid = await bcrypt.compare(pass.password, user.password);
        if (valid) {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(pass.newPassword, salt);
            await this.prisma.user.update({
                where: {
                    id: +id,
                },
                data: {
                    password: hash,
                },
            });
            return "Changed successfully";
        }
        else {
            return "invalid password";
        }
    }
    async intraJWT(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return this.generateToken(user.id, user.username, user.email);
    }
    async validateUser(data) {
        const { userId } = data;
        const user = await this.prisma.user.findUnique({
            where: {
                id: +userId,
            },
        });
        return user ? user : null;
    }
    async getProfile(id) {
        if (!isNaN(+id)) {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: +id,
                },
            });
            if (!user)
                return "Not found";
        }
        else {
            throw new common_1.NotFoundException("User not found");
            return "Not found";
        }
        const profile = await this.prisma.profile.findUnique({
            where: {
                userId: +id,
            },
        });
        return profile;
    }
    async validateJwtToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        }
        catch (error) {
            console.log("error : ", error);
            return null;
        }
    }
    async validateIntraUser(user) {
        const exist = await this.prisma.user.findUnique({
            where: { email: user.email },
        });
        if (!exist) {
            await this.prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    id42: +user.fortyTwoId,
                    password: "hhhh",
                    profile: {
                        create: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            username: user.username,
                        },
                    },
                },
            });
        }
        return user;
    }
    async getUserInfo(token) {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        const user = await this.prisma.user.findUnique({
            where: {
                id: +decoded.userId,
            },
        });
        delete user.password;
        return user;
    }
    async isBlocked(id, userId) {
        if (isNaN(+id) || isNaN(+userId)) {
            return { iBlocked: false, heBlocked: false };
        }
        const blocked = await this.prisma.BlockList.findMany({
            where: {
                userId: +id,
                blockedId: +userId,
            },
        });
        const blocked2 = await this.prisma.BlockList.findMany({
            where: {
                userId: +userId,
                blockedId: +id,
            },
        });
        if (blocked.length > 0) {
            return { iBlocked: true, heBlocked: false };
        }
        else if (blocked2.length > 0) {
            return { iBlocked: false, heBlocked: true };
        }
        return { iBlocked: false, heBlocked: false };
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map