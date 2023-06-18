import { Controller, Get, Post, Body, Patch, Param, Delete,Res,HttpStatus,Put,Query,UseInterceptors,UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UseGuards} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  
  @UseInterceptors(
    FileInterceptor("file", {
      storage :diskStorage({
        destination:"./upload/uploadUser",
        filename:(_request,file,callback)=>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 
  
  async createUSer(@Res() response, @Body() createUserDto: CreateUserDto  ,@UploadedFile() file ) {
    try {

      createUserDto.file = file.filename;
      const newUser = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        status: HttpStatus.OK,
        data: newUser
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: User not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  async updateuser(@Res() response, @Param('id') UserId: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const existinguser = await this.userService.updateUser(UserId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        data: existinguser,
        status: HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  @Get('/email')

  async UserByemail(@Res() response, @Query('email') email: string) {
    try {
      const existingUserByEmail = await
        this.userService.getUserByEmail(email);
      return response.status(HttpStatus.OK).json({
        message: 'user found successfully by email',
        data: existingUserByEmail,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Get('/username')

  async UserByusername(@Res() response, @Query('username') username: string) {
    try {
      const existingUserByusername = await
        this.userService.findByUsername(username);
      return response.status(HttpStatus.OK).json({
        message: 'user found successfully by username',
        data: existingUserByusername,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
 
  @Get()
  async getAllUser(@Res() response) {
    try {
      const UserData = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found successfully',
        status: HttpStatus.OK,
        data: UserData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

   @UseGuards(AccessTokenGuard)
  // @Get()
  // async getusers(@Res() response) {
  //   try {
  //     const UserData = await this.userService.getAllUsers();
  //     return response.status(HttpStatus.OK).json({
  //       message: 'All Users data found successfully', status: HttpStatus.OK, data: UserData,
  //     });
  //   } catch (err) {
  //     return response.status(err.status).json({
  //       message: err.response,
  //       status: HttpStatus.BAD_REQUEST,
  //       data: null
  //     });
  //   }
  // }
  @Get('/:id')
 /*  @ApiParam({
    email: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.'
  }) */

  async getuser(@Res() response, @Param('id') UserId: string) {
    try {
      const existingUser = await
        this.userService.getUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        data: existingUser,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  

  @Delete('/:id')
  async deleteuser(@Res() response, @Param('id') UserId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        status: HttpStatus.OK,
        data: deletedUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
}
