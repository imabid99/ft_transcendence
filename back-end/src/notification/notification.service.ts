import { Injectable, UseGuards , NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService {
    constructor(
      private prisma: PrismaService,
      private userService: UserService,
      
      ) {}

}
