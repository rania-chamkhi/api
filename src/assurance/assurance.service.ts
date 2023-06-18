import { Injectable ,NotFoundException } from '@nestjs/common';
import { CreateAssuranceDto } from './dto/create-assurance.dto';
import { UpdateAssuranceDto } from './dto/update-assurance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iass } from './dto/interfaces/assurance.interface';

@Injectable()
export class AssuranceService {

  constructor(
    @InjectModel('assurance') private AssModel: Model<Iass>,
  ) {}
  async createass ( createAssuranceDto: CreateAssuranceDto): Promise<Iass> {
    const newAss = await new this.AssModel(createAssuranceDto);
    return newAss.save();
  }
  async updateAss(
    AssId: string, updateAssuranceDto: UpdateAssuranceDto ): Promise<Iass> {
    const existingAssurance = await this.AssModel.findByIdAndUpdate(AssId,  updateAssuranceDto,{ new: true },
    );
    if (!existingAssurance) {
      throw new NotFoundException(`Assurance #${AssId} not found`);
    }
    return existingAssurance;
  }
  async getAllass(): Promise<Iass[]> {
    const AssuranceData = await this.AssModel.find().select('-__v');
    if (!AssuranceData || AssuranceData.length == 0) {
      throw new NotFoundException('Assurances data not found!');
    }
    return AssuranceData;
  }
  async getAss(AssId: string): Promise<Iass> {
    const existingAssurance = await this.AssModel.findById(
      AssId,
    ).exec();
    if (!existingAssurance) {
      throw new NotFoundException(`Assurance #${AssId} not found`);
    }
    return existingAssurance;
  }
  async AssuranceByName(name: string): Promise<Iass> {
    const existingAssurance = await this.AssModel.findOne({name: name}).exec();
    if (!existingAssurance) {
      throw new NotFoundException(`Assurance #${name} not found`);
    }
    return existingAssurance;
  }

  async deleteAss(AssId: string): Promise<Iass> {
    const deletedAss = await this.AssModel.findByIdAndDelete(
      AssId,
    );
    if (!deletedAss) {
      throw new NotFoundException(`Category #${AssId} not found`);
    }
    return deletedAss;
  }
  
}
