import { Controller, Get, Post, Body, Patch, Param, Delete,Res,HttpStatus,Put,Query } from '@nestjs/common';
import { AgenceService } from './agence.service';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { UpdateAgenceDto } from './dto/update-agence.dto';

@Controller('agence')
export class AgenceController {
  constructor(private readonly agenceService: AgenceService) {}

  @Post()
  
  async createAgence(@Res() response, @Body() createAgenceeDto: CreateAgenceDto) {
    try {
      const newAg = await this.agenceService.createag(createAgenceeDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Agence has been created successfully',
        status: HttpStatus.OK,
        data: newAg
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Agence not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  async updateAgence(@Res() response, @Param('id') AgId: string, @Body() updateAgenceDto:UpdateAgenceDto) {
    try {
      const existingAgence = await this.agenceService.updateAg(AgId, updateAgenceDto);
      return response.status(HttpStatus.OK).json({
        message: 'Agence has been successfully updated',
        data: existingAgence,
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
  async getAllag(@Res() response) {
    try {
      const AgData = await this.agenceService.getAllag();
      return response.status(HttpStatus.OK).json({
        message: 'All Agences data found successfully', status: HttpStatus.OK, data: AgData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  @Get('/name')
  async GetassByname(@Res() response, @Query('name') name: string) {
    try {
      const existingAgence = await this.agenceService.AgenceByName(name);
      return response.status(HttpStatus.OK).json({
        message: 'Agence found successfully',
        data: existingAgence,
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
 
  @Get('/:id')
  
  async getAgence(@Res() response, @Param('id') AgId: string) {
    try {
      const existingAgence = await
        this.agenceService.getAg(AgId);
      return response.status(HttpStatus.OK).json({
        message: 'Agence found successfully',
        data: existingAgence,
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
  async deleteAgence(@Res() response, @Param('id') AgId: string) {
    try {
      const deletedAg = await this.agenceService.deleteAg(AgId);
      return response.status(HttpStatus.OK).json({
        message: 'Agence deleted successfully',
        status: HttpStatus.OK,
        data: deletedAg,
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
