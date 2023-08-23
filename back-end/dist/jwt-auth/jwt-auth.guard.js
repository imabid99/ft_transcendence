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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const jwt = require("jsonwebtoken");
const user_service_1 = require("../user.service");
let JwtAuthGuard = exports.JwtAuthGuard = class JwtAuthGuard {
    constructor(reflector, jwtService, userService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    canActivate(context) {
        const Request = context.switchToHttp().getRequest();
        const authHeader = Request.headers.authorization;
        if (!authHeader) {
            return false;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return false;
        }
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            if (!this.userService.getUsers()) {
                console.log("no users");
                return false;
            }
        }
        catch (err) {
            console.log("err :", err.message);
            return false;
        }
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        user_service_1.UserService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map