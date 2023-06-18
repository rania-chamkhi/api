import { Controller, Get, Post, Body, Patch, Param, Delete,Res,HttpStatus,Put,Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { NotFoundException } from '@nestjs/common';

@Controller('reservation')
export class ReservationController {
  
  constructor(private readonly reservationService: ReservationService) { }


  @Put('/ass/:id')
  async updateResAss(@Res() response, @Param('id') ResId: string, @Body() updateReservationDto: UpdateReservationDto) {
      try {
          const existingReserv = await this.reservationService.ResAss(ResId, updateReservationDto);
          
          return response.status(HttpStatus.OK).json({
              message: 'Reservation has been successfully updated',
              data: {
                  reservation: existingReserv,
              },
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
  

  @Post('/reservationAss')
  async createResWithAssurance(@Res() response, @Body() createReservationDto: CreateReservationDto, @Body('assuranceId') assuranceId: string) {
    try {
      const newRes = await this.reservationService.createResWithAss(createReservationDto, assuranceId);
      return response.status(HttpStatus.CREATED).json({
        message: 'Reservation with assurance has been created successfully',
        status: HttpStatus.OK,
        data: newRes,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Reservation with assurance not created!' + err,
        data: null,
      });
    }
  }

  @Post()
  
  
  async createReserv(@Res() response, @Body() createReservationDto: CreateReservationDto) {
    try {
      const newRes = await this.reservationService.createRes(createReservationDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Reservation has been created successfully',
        status: HttpStatus.OK,
        data: {
           newRes,
         
        }
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Reservation not created!' + err,
        data: null
      });
    }
}




  @Put('/:id')
  async updatereservation(@Res() response, @Param('id') ResId: string, @Body() updateReservationDto: UpdateReservationDto) {
    try {
      const existingreserv = await this.reservationService.updateRes(ResId, updateReservationDto);
      return response.status(HttpStatus.OK).json({
        message: 'Reservation has been successfully updated',
        data: existingreserv,
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
  @Get('/numPermis')

  async ResBynumPermis(@Res() response, @Query('numPermis') numPermis: number) {
    try {
      const existingnumPermis = await
        this.reservationService.getnumPermis(numPermis);
      return response.status(HttpStatus.OK).json({
        message: 'user found successfully by numero matricule',
        data: existingnumPermis,
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

  @Get('/dateReserv')

  async getAlldateReservation(@Res() response, @Query('dateReserv') dateReserv: Date) {
    try {
      const existingdateReserv = await
        this.reservationService.getAlldateReserv(dateReserv);
      return response.status(HttpStatus.OK).json({
        message: 'Reservation found successfully by date Reservation',
        data: existingdateReserv,
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

  @Get('/dateFinloc')

  async getAlldatedateFinloc(@Res() response, @Query('dateFinloc') dateFinloc: Date) {
    try {
      const existingdateReserv = await
        this.reservationService.getAlldateFinloc(dateFinloc);
      return response.status(HttpStatus.OK).json({
        message: 'Reservation found successfully by date Reservation',
        data: existingdateReserv,
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
  async getAllreservation(@Res() response) {
    try {
      const ResData = await this.reservationService.getAllRes();
      return response.status(HttpStatus.OK).json({
        message: 'All Reservations data found successfully',
        status: HttpStatus.OK,
        data: ResData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get('/:id')
  async getreservation(@Res() response, @Param('id') ResId: string) {
    try {
      const existingreserv = await this.reservationService.getRes(ResId);
      return response.status(HttpStatus.OK).json({
        message: 'Reservation found successfully',
        data: existingreserv,
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
  async deleteReservation(@Res() response, @Param('id') ResId: string) {
    try {
      const deletedRes = await this.reservationService.deleteReserv(ResId);
      return response.status(HttpStatus.OK).json({
        message: 'Reservation deleted successfully',
        status: HttpStatus.OK,
        data: deletedRes,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }


  @Get('/user/:id')
  async getReservationByUserId(@Res() response, @Param('id') userId: string) {
    try {
      const existingreserv = await this.reservationService.getReservationByUserId(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Reservations found successfully',
        data: existingreserv,
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
 

 
}

