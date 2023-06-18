import { Controller, Get, Post, Body, Patch, Param, Delete,Res,HttpStatus,Query,Put,UploadedFiles,UseInterceptors,UploadedFile } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { NotFoundException ,BadRequestException} from '@nestjs/common';
import { CreateReservationDto } from 'src/reservation/dto/create-reservation.dto';
import { Iveh } from './dto/interfaces/vehicule.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('vehicule')
export class VehiculeController {
  constructor(private readonly vehiculeService: VehiculeService) { }

  @Post()
  
  @UseInterceptors(
    FileInterceptor("file", {
      storage :diskStorage({
        destination:"./upload/UploadVehicule",
        filename:(_request,file,callback)=>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  
  async createReserv(@Res() response, @Body() createVehiculeDto: CreateVehiculeDto ,@UploadedFile() file) {
    try {

      createVehiculeDto.file = file.filename;

      const newVeh = await this.vehiculeService.createVeh(createVehiculeDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Vehicule has been created successfully',
        status: HttpStatus.OK,
        data: newVeh
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Vehicule not created!' + err,
        data: null
      });
    }
  }

 @Put('disponible/:id')
async updateDisponibiliteVeh(@Param('id') VehId: string, @Res() response) {
  try {
    const updatedVeh = await this.vehiculeService.updateDisponibiliteVeh(VehId);

    return response.status(HttpStatus.OK).json({
      message: `Vehicule #${VehId} has been set to available`,
      status: HttpStatus.OK,
      data: updatedVeh,
    });
  } catch (err) {
    console.log("🚀 ~ file: vehicule.controller.ts:58 ~ VehiculeController ~ updateDisponibiliteVeh ~ err:", err)
    return response.status(HttpStatus.BAD_REQUEST).json({
      status: 400,
      message: `Error: Cannot update vehicule #${VehId} disponibilite!`,
      data: null,
    });
  }
}
  @Put('/:id')
  async updatevehicule(@Res() response, @Param('id') VehId: string, @Body() updateVehiculeDto: UpdateVehiculeDto) {
    try {
      const existingveh = await this.vehiculeService.updateVeh(VehId, updateVehiculeDto);
      return response.status(HttpStatus.OK).json({
        message: 'Vehicule has been successfully updated',
        data: existingveh,
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

  @Get('/nondisponible')
  async getNonDisponibleVeh(@Res() response) {
    try {
      const nonDisponibleVehs = await this.vehiculeService.getNonDisponibleVeh();
      return response.status(HttpStatus.OK).json({
        message: 'List of non disponible vehicles',
        status: HttpStatus.OK,
        data: nonDisponibleVehs
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Cannot get non disponible vehicles!' + err,
        data: null
      });
    }
  }

  @Get('/numMatr')

  async VehBynumMatricule(@Res() response, @Query('numMatr') numMatr: number) {
    try {
      const existingnumMatr = await
        this.vehiculeService.getnumMatr(numMatr);
      return response.status(HttpStatus.OK).json({
        message: 'vehicule found successfully by numero matricule',
        data: existingnumMatr,
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

  @Get('/modele')

  async getAllMod(@Res() response, @Query('modele') modele: string) {
    try {
      const existingmodele = await
        this.vehiculeService.getAllModele(modele);
      return response.status(HttpStatus.OK).json({
        message: 'Vehicule found successfully by modele',
        data: existingmodele,
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

  @Get('/marque')

  async getAllmarq(@Res() response, @Query('marque') marque: string) {
    try {
      const existingmarque = await
        this.vehiculeService.getAllmarque(marque);
      return response.status(HttpStatus.OK).json({
        message: 'Vehicule found successfully by marque',
        data: existingmarque,
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
  async getAllvehicule(@Res() response) {
    try {
      const VehData = await this.vehiculeService.getAllVeh();
      return response.status(HttpStatus.OK).json({
        message: 'All Vehicule data found successfully',
        status: HttpStatus.OK,
        data: VehData,
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
  async getvehicule(@Res() response, @Param('id') VehId: string) {
    try {
      const existingveh = await
        this.vehiculeService.getVeh(VehId);
      return response.status(HttpStatus.OK).json({
        message: 'Vehicule found successfully',
        data: existingveh,
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
  async deletevehicule(@Res() response, @Param('id') VehId: string) {
    try {
      const deletedVeh = await this.vehiculeService.deleteVeh(VehId);
      return response.status(HttpStatus.OK).json({
        message: 'Vehicule deleted successfully',
        status: HttpStatus.OK,
        data: deletedVeh,
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


