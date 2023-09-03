import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
interface AuthenticatedRequest extends Request {
    user: any;
}
export declare class AuthMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: UserService);
    use(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}
export {};
