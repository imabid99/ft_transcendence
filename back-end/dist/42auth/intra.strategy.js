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
exports.FortyTwoStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_42_1 = require("passport-42");
const user_service_1 = require("../user.service");
let FortyTwoStrategy = exports.FortyTwoStrategy = class FortyTwoStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, '42') {
    constructor(userService) {
        super({
            clientID: process.env.UID_42,
            clientSecret: process.env.SECRET_42,
            callbackURL: process.env.CALLBACK_URL_42,
        });
        this.userService = userService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { id, username, emails, name } = profile;
        const userData = {
            fortyTwoId: id,
            username,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
        };
        const user = await this.userService.validateIntraUser(userData);
        return user;
    }
};
exports.FortyTwoStrategy = FortyTwoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], FortyTwoStrategy);
//# sourceMappingURL=intra.strategy.js.map