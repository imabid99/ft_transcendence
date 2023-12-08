import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";
import * as cors from 'cors';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: '*',
    credentials: true
  }));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();