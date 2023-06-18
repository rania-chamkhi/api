import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IContact } from './entities/interfaces/contact.interface';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectModel('contact') private contacttModel: Model<IContact>) {}

  async createContact(createContactDto: CreateContactDto): Promise<IContact> {
    const newContact = await new this.contacttModel(createContactDto);
    return newContact.save();
  }

  async listContacts(): Promise<IContact[]> {
    const contacts = await this.contacttModel.find({type : "information"}).select('-__v');
    if (!contacts || contacts.length == 0) {
      throw new NotFoundException('Contacts data not found!');
    }
    return contacts;
  }

  async getFeedbackByCar(car_id : string): Promise<any> {
    const contacts = await this.contacttModel.find({type : "feedback"}).populate({ 
      path: 'reservationId',
      populate: {
        path: 'userId'
      } 
   })
   //populate('reservationId');
    return contacts
    /* if(contacts && contacts.length > 0){
      var filtredContact = await contacts.filter(contact => contact.reservationId.vehiculeId == car_id);
      return filtredContact;
    }else{
      throw new NotFoundException('Feedback data not found!');
    } */
  }

  async getReclamationByReservation(res_id : string): Promise<IContact[]> {
    const contacts = await this.contacttModel.find({type : "reclamation" , reservationId :  res_id}).select('-__v');
    if (!contacts || contacts.length == 0) {
      throw new NotFoundException('Reclamation data not found!');
    }
    return contacts;
  }

  async findContact(id: string): Promise<IContact> {
    const contact = await this.contacttModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException(`Contact #${id} not found`);
    }
    return contact;
  }

  async deleteContact(id: string): Promise<IContact> {
    const contact = await this.contacttModel.findByIdAndDelete(id);
    if (!contact) {
      throw new NotFoundException(`Contact #${contact} not found`);
    }
    return contact;
  }
}
