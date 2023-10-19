"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const user_controller_1 = require("./user/user.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const user_service_1 = require("./user/user.service");
const auth_service_1 = require("./auth/auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt-auth/jwt.strategy");
const intra_strategy_1 = require("./42auth/intra.strategy");
const chat_module_1 = require("./chat/chat.module");
const auth_controller_1 = require("./auth/auth.controller");
const google_starategy_1 = require("./google/google.starategy");
const platform_express_1 = require("@nestjs/platform-express");
const upload_controller_1 = require("./upload/upload.controller");
const friendship_controller_1 = require("./friendship/friendship.controller");
const upload_service_1 = require("./upload/upload.service");
const friendship_service_1 = require("./friendship/friendship.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule.register({ defaultStrategy: ["42", "google"] }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: "1d" },
            }),
            chat_module_1.ChatModule,
            platform_express_1.MulterModule.register({
                dest: "./uploads",
            }),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.userController, auth_controller_1.authController, upload_controller_1.uploadController, friendship_controller_1.friendshipController],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            user_service_1.UserService,
            upload_service_1.UploadService,
            jwt_strategy_1.JwtStrategy,
            google_starategy_1.GoogleStrategy,
            intra_strategy_1.FortyTwoStrategy,
            friendship_service_1.FriendshipService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map