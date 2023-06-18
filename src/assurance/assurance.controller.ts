import { Controller, Get, Post, Body, Patch, Param, Delete,Res,HttpStatus,Put,Query } from '@nestjs/common';
import { AssuranceService } from './assurance.service';
import { CreateAssuranceDto } from './dto/create-assurance.dto';
import { UpdateAssuranceDto } from './dto/update-assurance.dto';

@Controller('assurance')
export class AssuranceController {
  constructor(private readonly assuranceService: AssuranceService) {}

  @Post()
  
   async createAssurance(@Res() response, @Body() createAssuranceDto: CreateAssuranceDto) {
     try {
       const newAss = await this.assuranceService.createass(createAssuranceDto);
       return response.status(HttpStatus.CREATED).json({
         message: 'Assurance has been created successfully',
         status: HttpStatus.OK,
         data: newAss
       });
     } catch (err) {
       return response.status(HttpStatus.BAD_REQUEST).json({
         status: 400,
         message: 'Error: Assurance not created!' + err,
         data: null
       });
     }
   }
   @Put('/:id')
   async updateAss(@Res() response, @Param('id') AssId: string, @Body() updateAssuranceDto:UpdateAssuranceDto) {
     try {
       const existingAssurance = await this.assuranceService.updateAss(AssId, updateAssuranceDto);
       return response.status(HttpStatus.OK).json({
         message: 'Assurance has been successfully updated',
         data: existingAssurance,
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
   async getAllass(@Res() response) {
     try {
       const AssData = await this.assuranceService.getAllass();
       return response.status(HttpStatus.OK).json({
         message: 'All Assurances data found successfully', status: HttpStatus.OK, data: AssData,
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
       const existingAssurance = await this.assuranceService.AssuranceByName(name);
       return response.status(HttpStatus.OK).json({
         message: 'assurance found successfully',
         data: existingAssurance,
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
   
   async getAssurance(@Res() response, @Param('id') AssId: string) {
     try {
       const existingAssurance = await
         this.assuranceService.getAss(AssId);
       return response.status(HttpStatus.OK).json({
         message: 'Assurance found successfully',
         data: existingAssurance,
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
   async deleteAssurance(@Res() response, @Param('id') AssId: string) {
     try {
       const deletedAss = await this.assuranceService.deleteAss(AssId);
       return response.status(HttpStatus.OK).json({
         message: 'Assurance deleted successfully',
         status: HttpStatus.OK,
         data: deletedAss,
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
