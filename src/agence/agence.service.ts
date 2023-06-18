import { Injectable } from '@nestjs/common';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { UpdateAgenceDto } from './dto/update-agence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { Iag } from './dto/interfaces/agence.interface';

@Injectable()
export class AgenceService {
  constructor(
    @InjectModel('agence') private AgModel: Model<Iag>,
  ) {}
  async createag ( createAgenceDto: CreateAgenceDto): Promise<Iag> {
    const newAg = await new this.AgModel(createAgenceDto);
    return newAg.save();
  }
  async updateAg(
    AgId: string, updateAgenceDto: UpdateAgenceDto): Promise<Iag> {
    const existingAgence = await this.AgModel.findByIdAndUpdate(AgId,  updateAgenceDto,{ new: true },
    );
    if (!existingAgence) {
      throw new NotFoundException(`Agence #${AgId} not found`);
    }
    return existingAgence;
  }
  async getAllag(): Promise<Iag[]> {
    const AgenceData = await this.AgModel.find().select('-__v');
    if (!AgenceData || AgenceData.length == 0) {
      throw new NotFoundException('Agences data not found!');
    }
    return AgenceData;
  }
  async getAg(AgId: string): Promise<Iag> {
    const existingAgence = await this.AgModel.findById(
      AgId,
    ).exec();
    if (!existingAgence) {
      throw new NotFoundException(`Agence #${AgId} not found`);
    }
    return existingAgence;
  }
  async AgenceByName(name: string): Promise<Iag> {
    const existingAgence = await this.AgModel.findOne({name: name}).exec();
    if (!existingAgence) {
      throw new NotFoundException(`Agence #${name} not found`);
    }
    return existingAgence;
  }

  async deleteAg(AgId: string): Promise<Iag> {
    const deletedAg = await this.AgModel.findByIdAndDelete(
      AgId,
    );
    if (!deletedAg) {
      throw new NotFoundException(`Agence #${AgId} not found`);
    }
    return deletedAg;
  }
}
