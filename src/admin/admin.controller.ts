import { Controller, Get, Post, Body, Patch, Param, Delete,Res,HttpStatus,Put,Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { get } from 'http';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  
  
  
  async createUSer(@Res() response, @Body() createAdminDto: CreateAdminDto) {
    try {

     /*  CreateUserDto.files=files.map(item=>item.filename); */
      const newUser = await this.adminService.createAdmin(createAdminDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Admin has been created successfully',
        status: HttpStatus.OK,
        data: newUser
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Admin not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  async updateadmin(@Res() response, @Param('id') AdminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    try {
      const existingadmin = await this.adminService.updateAdmin(AdminId, updateAdminDto);
      return response.status(HttpStatus.OK).json({
        message: 'Admin has been successfully updated',
        data: existingadmin,
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

  async AdminByemail(@Res() response, @Query('email') email: string) {
    try {
      const existingAdminByEmail = await
        this.adminService.getAdminByEmail(email);
      return response.status(HttpStatus.OK).json({
        message: 'admin found successfully by email',
        data: existingAdminByEmail,
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

  async AdminByusername(@Res() response, @Query('username') username: string) {
    try {
      const existingAdminByusername = await
        this.adminService.findByUsernameAdmin(username);
      return response.status(HttpStatus.OK).json({
        message: 'user found successfully by username',
        data: existingAdminByusername,
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
  async getAllAdmin(@Res() response) {
    try {
      const AdminData = await this.adminService.getAllAdmins();
      return response.status(HttpStatus.OK).json({
        message: 'All Admins data found successfully',
        status: HttpStatus.OK,
        data: AdminData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get('report')
  async getReports(@Res() response) {
    try {
      const reports = await this.adminService.getadminReports();
      return response.status(HttpStatus.OK).json({
        message: 'Report data found successfully',
        status: HttpStatus.OK,
        data: reports,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

   //@UseGuards(AccessTokenGuard)
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

  async getadmin(@Res() response, @Param('id') AdminId: string) {
    try {
      const existingAdmin = await
        this.adminService.getAdmin(AdminId);
      return response.status(HttpStatus.OK).json({
        message: 'Admin found successfully',
        data: existingAdmin,
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
  async deleteadmin(@Res() response, @Param('id') AdminId: string) {
    try {
      const deletedAdmin = await this.adminService.deleteAdmin(AdminId);
      return response.status(HttpStatus.OK).json({
        message: 'Admin deleted successfully',
        status: HttpStatus.OK,
        data: deletedAdmin,
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
