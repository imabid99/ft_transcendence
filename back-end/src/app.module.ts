import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { userController } from "./user/user.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt-auth/jwt.strategy";
import { FortyTwoStrategy } from "./42auth/intra.strategy";
import { ChatModule } from "./chat/chat.module";
import { authController } from "./auth/auth.controller";
import { GoogleStrategy } from "./google/google.starategy";
import { MulterModule } from "@nestjs/platform-express";
import { uploadController } from "./upload/upload.controller";
import { friendshipController } from "./friendship/friendship.controller";
import { UploadService } from "./upload/upload.service";
import { FriendshipService } from "./friendship/friendship.service";
import { UploadModule } from "./upload/upload.module";
import { NotificationModule } from "./notification/notification.module";
import { GameModule } from "./Game/game.module";
import { friendshipModule } from "./friendship/friendship.module";
import { NotificationGateway } from "./notification/gateway/notification.gateway";
import { GameController } from "./Game/game.controller";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: ["42", "google"] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    GameModule,
    UploadModule,
    NotificationModule,
    UserModule,
    AuthModule,
    friendshipModule,
    MulterModule.register({
      dest: "./uploads/all",
    }),
  ],
  controllers: [AppController, authController],
  providers: [
    AppService,
    AuthService,
    UserService,
    NotificationGateway,
    JwtStrategy,
    GoogleStrategy,
    FortyTwoStrategy,
    FriendshipService
  ],
})
export class AppModule {}
