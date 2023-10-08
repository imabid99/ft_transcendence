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
    constructor(prisma) {
        this.prisma = prisma;
    }
    checkMute(arg0, groupId) {
        throw new Error("Method not implemented.");
    }
    async getUsers() {
        const users = await this.prisma.user.findMany();
        return users;
    }
    async getProfiles() {
        const profiles = await this.prisma.profile.findMany();
        return profiles;
    }
    generateToken(userId, username, email) {
        const token = jwt.sign({ userId, username, email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return token;
    }
    async changePass(pass, id) {
        const user = await this.prisma.user.findUnique({ where: { id: id } });
        const valid = await bcrypt.compare(pass.password, user.password);
        try {
            if (valid) {
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(pass.newPassword, salt);
                await this.prisma.user.update({
                    where: {
                        id: id,
                    },
                    data: {
                        password: hash,
                    },
                });
            }
            else {
                throw new common_1.NotFoundException("User not found");
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Internal server error");
        }
    }
    async intraJWT(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return this.generateToken(user.id, user.username, user.email);
    }
    async googleJWT(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return this.generateToken(user.id, user.username, user.email);
    }
    async validateUser(data) {
        const { userId } = data;
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user ? user : null;
    }
    async getProfile(id) {
        try {
            if (!id) {
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: id,
                    },
                });
                if (!user) {
                    throw new common_1.NotFoundException("User not found");
                }
                const profile = await this.prisma.profile.findUnique({
                    where: {
                        userId: id,
                    },
                });
                return profile;
            }
            else {
                throw new common_1.BadRequestException("Invalid input");
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Internal server error");
        }
    }
    async validateJwtToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        }
        catch (error) {
            throw new common_1.BadRequestException("Invalid token");
        }
    }
    async validateIntraUser(user) {
        try {
            const exist = await this.prisma.user.findUnique({
                where: { email: user.email },
            });
            if (!exist) {
                await this.prisma.user.create({
                    data: {
                        username: user.username,
                        email: user.email,
                        id42: user.fortyTwoId,
                        password: "42",
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
        catch (error) {
            throw new common_1.InternalServerErrorException("Internal server error");
        }
    }
    async validateGoogleUser(user) {
        try {
            const exist = await this.prisma.user.findUnique({
                where: { email: user.email },
            });
            if (!exist) {
                await this.prisma.user.create({
                    data: {
                        username: "user.username",
                        email: user.email,
                        idGoogle: user.googleId,
                        password: "google",
                        profile: {
                            create: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                username: "user.username",
                            },
                        },
                    },
                });
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Internal server error");
        }
    }
    async isBlocked(id, userId) {
        if (id || userId) {
            return { iBlocked: false, heBlocked: false };
        }
        const blocked = await this.prisma.BlockList.findMany({
            where: {
                userId: id,
                blockedId: userId,
            },
        });
        const blocked2 = await this.prisma.BlockList.findMany({
            where: {
                userId: userId,
                blockedId: id,
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
    async getUserInfo(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        delete user.password;
        return user;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map