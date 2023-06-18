import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { EmailService } from './mail.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService , private readonly emailService: EmailService) {}

  @Post()
  async createContact(
    @Res() response,
    @Body() createContactDto: CreateContactDto,
  ) {
    try {
      const newContact = await this.contactService.createContact(
        createContactDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Contact has been created successfully',
        status: HttpStatus.OK,
        data: newContact,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Contact not created!' + err,
        data: null,
      });
    }
  }


  @Get()
  async listContact(@Res() response) {
    try {
      const contacts = await this.contactService.listContacts();
      return response.status(HttpStatus.OK).json({
        message: 'All contacts data found successfully',
        status: HttpStatus.OK,
        data: contacts,
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
  async findContact(@Res() response, @Param('id') id: string) {
    try {
      const contact = await this.contactService.findContact(id);
      return response.status(HttpStatus.OK).json({
        message: 'Contact found successfully',
        data: contact,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get('/feedback/:id')
  async getFeedbackByCar(@Res() response, @Param('id') car_id: string) {
    try {
      const contact = await this.contactService.getFeedbackByCar(car_id);
      return response.status(HttpStatus.OK).json({
        message: 'Contact found successfully',
        data: contact,
        status: HttpStatus.OK,
      });
    } catch (err) {
      console.log(JSON.stringify(err))
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get('/reclamation/:id')
  async getReclamationByReservation(@Res() response, @Param('id') res_id: string) {
    try {
      const contact = await this.contactService.getReclamationByReservation(res_id);
      return response.status(HttpStatus.OK).json({
        message: 'Reclamation found successfully',
        data: contact,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Delete('/:id')
  async deleteContact(@Res() response, @Param('id') id: string) {
    try {
      const contact = await this.contactService.deleteContact(id);
      return response.status(HttpStatus.OK).json({
        message: 'Contact deleted successfully',
        status: HttpStatus.OK,
        data: contact,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Post('/reply')
  async sendEmail(@Res() response, @Body() body: { to: string; subject: string; content: string }): Promise<string> {
    try {
      const { to, subject, content } = body;
      await this.emailService.sendEmail(to, subject, content);
      return response.status(HttpStatus.OK).json({
        message: 'Email sent successfully',
        status: HttpStatus.OK,
        data: body,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
}
