import { Injectable ,NotFoundException } from '@nestjs/common';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iveh } from './dto/interfaces/vehicule.interface';
import { Iag } from 'src/agence/dto/interfaces/agence.interface';
import { Ires } from 'src/reservation/dto/interfaces/reservation.interface';

@Injectable()
export class VehiculeService {
  constructor(@InjectModel('vehicule') private VehModel: Model<Iveh>,
  @InjectModel('agence') private AgModel: Model<Iag>,
  @InjectModel('reservation') private ResModel: Model<Ires>,) { }

  

  async createVeh(createVehiculeDto: CreateVehiculeDto): Promise<Iveh> {
    const newVeh = await new this.VehModel(createVehiculeDto);

    await this.AgModel.findByIdAndUpdate(createVehiculeDto.agenceId, {
      $push: { vehiculeId: newVeh },
    });
    return newVeh.save();
  }
  async findById(id: string): Promise<Iveh>{
    return this.VehModel.findById(id);
  }

  async updateVeh(VehId: string, updatevehiculeDto: UpdateVehiculeDto): Promise<Iveh> {
    const existingveh = await this.VehModel.findByIdAndUpdate(VehId, updatevehiculeDto, { new: true });
    if (!existingveh) {
      throw new NotFoundException(`vehicule #${VehId} not found`);
    }
    return existingveh;
  }
  async getAllVeh(): Promise<Iveh[]> {
    const VehData = await this.VehModel.find().populate('reservationId').select("-__v");
    if (!VehData || VehData.length == 0) {
      throw new NotFoundException('Vehicule data not found!');
    }
    return VehData;
  }
  async getVeh(VehId: string): Promise<Iveh> {
    const existingVeh = await this.VehModel.findById(VehId).populate('reservationId').populate('agenceId').exec();
    if (!existingVeh) {
      throw new NotFoundException(`Vehicule #${VehId} not found`);
    }
    return existingVeh;
  }


  
  async getAllModele(modele: string): Promise<Iveh[]> {
    const existingmodele = await this.VehModel.find({modele:modele}).exec();
    if (!existingmodele) {
      throw new NotFoundException(`modele #${modele} not found`);
    }
    return existingmodele;
  }

  async getnumMatr(numMatr: number): Promise<Iveh> {
    const existingnumMatr = await this.VehModel.findOne({numMatr:numMatr}).exec();
    if (!existingnumMatr) {
      throw new NotFoundException(`numéro de matricule #${numMatr} not found`);
    }
    return existingnumMatr;
  }

  async getAllmarque(marque: string): Promise<Iveh[]> {
    const existingmarque = await this.VehModel.find({marque:marque}).exec();
    if (!existingmarque) {
      throw new NotFoundException(`modele #${marque} not found`);
    }
    return existingmarque;
  }
  


  async deleteVeh(VehId: string): Promise<Iveh> {
    const deletedVeh = await this.VehModel.findByIdAndDelete(VehId);

    await this.AgModel.findByIdAndUpdate(deletedVeh.agenceId, {
      $pull: { vehiculeId: deletedVeh._id },
    });

    if (!deletedVeh) {
      throw new NotFoundException(`Vehicule #${VehId} not found`);
    }
    return deletedVeh;
  }

  

  async getNonDisponibleVeh(): Promise<Iveh[]> {
    const VehData = await this.VehModel.find({ disponible: false }).populate('reservationId').select("-__v");
    if (!VehData || VehData.length == 0) {
      throw new NotFoundException('No non disponible vehicles found!');
    }
    return VehData;
  }
 
  async updateDisponibiliteVeh(VehId: string): Promise<Iveh> {
    const vehicule = await this.VehModel.findById(VehId);
  
    if (!vehicule) {
      throw new NotFoundException(`Vehicule #${VehId} not found`);
    }
  
    vehicule.disponible = true;
  
    await vehicule.save();
  
    return vehicule;
  }


}
