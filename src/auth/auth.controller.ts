import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards,UseInterceptors,UploadedFile } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { Request } from 'express';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')

  @UseInterceptors(
    FileInterceptor("file", {
      storage :diskStorage({
        destination:"./upload/uploadUser",
        filename:(_request,file,callback)=>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )

  signup(@Body() createUserDto: CreateUserDto ,@UploadedFile() file) {
    createUserDto.file = file.filename;
    return this.authService.signUp(createUserDto);


  }

  @Post('/signin')
  signIn(@Body() data: CreateLoginDto ) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)

  @Get('logout')

  logout(@Req() req: Request) {

    return this.authService.logout(req.user['sub']);


  }


  @UseGuards(RefreshTokenGuard)

  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken)

  }


  //admin

  @Post('/signupadmin')

  @UseInterceptors(
    FileInterceptor("file", {
      storage :diskStorage({
        destination:"./upload/uploadAdmin",
        filename:(_request,file,callback)=>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )


  signupadmin(@Body() createAdminDto: CreateAdminDto ,@UploadedFile() file) {

    createAdminDto.file = file.filename;
     console.log("body ",createAdminDto)
    return this.authService.signUpAdmin(createAdminDto);


  }

  @Post('/signinadmin')
  signInadmin(@Body() data: CreateLoginDto) {
    return this.authService.signInAdmin(data);
  }

  @UseGuards(RefreshTokenGuard)

  @Get('refresh')
  refreshTokensadmin(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokensAdmin(userId, refreshToken)

  }
 
  @Get('logoutAdmin')

  logoutadmin(@Req() req: Request) {

    if (req.user) {
      return this.authService.logoutAdmin(req.user['sub']);
    } else {
      // handle unauthenticated request
    }


  }
}
