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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dtos/user.dto");
const user_login_dto_1 = require("./dtos/user-login.dto");
const passport_1 = require("@nestjs/passport");
const jwt_auth_guard_1 = require("./jwt-auth/jwt-auth.guard");
let userController = exports.userController = class userController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers(headers) {
        return this.userService.getUsers();
    }
    signup(userData) {
        if (userData.email && userData.password)
            return this.userService.addUser(userData);
        else {
            return "invalid input";
        }
    }
    signin(userData) {
        if (userData.email && userData.password)
            return this.userService.login(userData);
        else {
            return "invalid input";
        }
    }
    changePass(req) {
        const chPass = req.body;
        if (chPass.newPassword && chPass.password) {
            return this.userService.changePass(chPass, req.user.id);
        }
        else
            return "Invalid input";
    }
    Callback(req) {
        return this.userService.intraJWT(req.user.email);
    }
    profile() {
        return this.userService.getProfiles();
    }
    pubProfile(params) {
        return this.userService.getProfile(params.id);
    }
    async fortyTwoCallback(req) {
        console.log("here");
    }
    async getUserInfo(headers) {
        return this.userService.getUserInfo(headers.authorization);
    }
    async isBlocked(userId, tragetId) {
        return this.userService.isBlocked(userId, tragetId);
    }
    async myChannels(id) {
        return this.userService.getMyChannels(id);
    }
};
__decorate([
    (0, common_1.Get)("all"),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserData]),
    __metadata("design:returntype", void 0)
], userController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserDataLogin]),
    __metadata("design:returntype", void 0)
], userController.prototype, "signin", null);
__decorate([
    (0, common_1.Patch)("pass"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userController.prototype, "changePass", null);
__decorate([
    (0, common_1.Get)("intra"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("42")),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userController.prototype, "Callback", null);
__decorate([
    (0, common_1.Get)("profiles"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], userController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)("profile/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userController.prototype, "pubProfile", null);
__decorate([
    (0, common_1.Get)("42"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("42")),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "fortyTwoCallback", null);
__decorate([
    (0, common_1.Get)("userinfo"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)("is-blocked/:userId/:tragetId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("tragetId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], userController.prototype, "isBlocked", null);
__decorate([
    (0, common_1.Get)("myChannels/:id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], userController.prototype, "myChannels", null);
exports.userController = userController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], userController);
//# sourceMappingURL=user.controller.js.map