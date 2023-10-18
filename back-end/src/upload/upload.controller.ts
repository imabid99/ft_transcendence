import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { customStorage } from "./multer-config";

@Controller("upload")
export class uploadController {
  constructor(private uploadService: UploadService) {}

  @Post("upload/avatar")
  @UseInterceptors(FileInterceptor("file", { storage: customStorage }))
  @UseGuards(AuthGuard("jwt"))
  async uploadAvatar(
    @Req() req,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    console.log(file.path);
    return this.uploadService.uploadAvatar(file.path, req.user.id);
  }
  @Get("avatar")
  @UseGuards(AuthGuard("jwt"))
  async getAvatar(@Req() req): Promise<void> {
    return this.uploadService.getAvatar(req.user.id);
  }
  @Post("upload/cover")
  @UseInterceptors(FileInterceptor("file", { storage: customStorage }))
  @UseGuards(AuthGuard("jwt"))
  async uploadCover(
    @Req() req,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    console.log(file.path);
    return this.uploadService.uploadCover(file.path, req.user.id);
  }
  @Get("cover")
  @UseGuards(AuthGuard("jwt"))
  async getCover(@Req() req): Promise<void> {
    return this.uploadService.getCover(req.user.id);
  }

  @Post("upload/channelAvatar/:id")
  @UseInterceptors(FileInterceptor("file", { storage: customStorage }))
  @UseGuards(AuthGuard("jwt"))
  async uploadChannelAvatar(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Param() params: any
  ): Promise<void> {
    console.log(file.path);
    return this.uploadService.uploadChannelAvatar(file.path, params.id);
  }
}