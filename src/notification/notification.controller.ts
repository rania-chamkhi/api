import { Controller, Get, Post, Body, Patch, Param, Delete,Res,HttpStatus,Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  
   async createNotification(@Res() response) {
     try {
       const newNot= await this.notificationService.createnot();
       return response.status(HttpStatus.CREATED).json({
         message: 'Notification has been created successfully',
         status: HttpStatus.OK,
         data: newNot
       });
     } catch (err) {
       return response.status(HttpStatus.BAD_REQUEST).json({
         status: 400,
         message: 'Error: Notification not created!' + err,
         data: null
       });
     }
   }
   @Put('/:id')
   async updateNot(@Res() response, @Param('id') NotId: string, @Body() updateNotificationDto:UpdateNotificationDto) {
     try {
       const existingNotification = await this.notificationService.updateNot(NotId, updateNotificationDto);
       return response.status(HttpStatus.OK).json({
         message: 'Notification has been successfully updated',
         data: existingNotification,
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
   @Get()
   async getAllnotif(@Res() response) {
     try {
       const NotData = await this.notificationService.getAllnot();
       return response.status(HttpStatus.OK).json({
         message: 'All Notifications data found successfully', status: HttpStatus.OK, data: NotData,
       });
     } catch (err) {
       return response.status(err.status).json({
         message: err.response,
         status: HttpStatus.BAD_REQUEST,
         data: null
       });
     }
   }
  
   @Get('/:id')
   
   async getnotification(@Res() response, @Param('id') NotId: string) {
     try {
       const existingNotification= await
         this.notificationService.getNot(NotId);
       return response.status(HttpStatus.OK).json({
         message: 'Notification found successfully',
         data: existingNotification,
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
   async deleteNotif(@Res() response, @Param('id') NotId: string) {
     try {
       const deletedNot = await this.notificationService.deleteNot(NotId);
       return response.status(HttpStatus.OK).json({
         message: 'Notification deleted successfully',
         status: HttpStatus.OK,
         data: deletedNot,
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
