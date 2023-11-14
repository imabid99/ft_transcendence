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
import { UploadModule } from "./upload/upload.module";
import { NotificationModule } from "./notification/notification.module";
import { friendshipModule } from "./friendship/friendship.module";

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: ["42", "google"] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    ChatModule,
    UploadModule,
    NotificationModule,
    friendshipModule,
    MulterModule.register({
      dest: "./uploads/all",
    }),
  ],
  controllers: [AppController, userController, authController],
  providers: [
    AppService,
    AuthService,
    UserService,
    JwtStrategy,
    GoogleStrategy,
    FortyTwoStrategy,
  ],
})
export class AppModule {}
