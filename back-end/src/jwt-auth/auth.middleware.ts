import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../user.service";
import * as jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: UserService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Invalid or missing authorization header"
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.authService.validateUser(decoded);

      if (!user) {
        throw new UnauthorizedException("Invalid user");
      }

      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
