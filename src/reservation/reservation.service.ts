import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ires } from './dto/interfaces/reservation.interface';
import { Model } from 'mongoose';
import { Iuser } from 'src/user/entities/interfaces/user.interface';
import { Iveh } from 'src/vehicule/dto/interfaces/vehicule.interface';
import { Iass } from 'src/assurance/dto/interfaces/assurance.interface';
import * as moment from 'moment-timezone';
import { Inot } from 'src/notification/entities/interfaces/notification.interface';


@Injectable()
export class ReservationService {
  constructor(@InjectModel('reservation') private ResModel: Model<Ires>,
    @InjectModel('user') private UserModel: Model<Iuser>,
    @InjectModel('vehicule') private VehModel: Model<Iveh>,
    @InjectModel('assurance') private AssModel: Model<Iass>,
    @InjectModel('notification') private NotModel: Model<Inot>) { }

  async createRes(createReservationDto: CreateReservationDto): Promise<Ires> {
    const vehicule = await this.VehModel.findById(createReservationDto.vehiculeId);
    if (vehicule.disponible == false) {
      throw new HttpException(
        {
          message:
            "Ce véhicule est déjà réservé pour cette date et heure. Veuillez choisir une autre date ou un autre véhicule.",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Mark the vehicle as unavailable during the rental period
    await this.VehModel.findByIdAndUpdate(createReservationDto.vehiculeId, {
      disponible: false,
    });

    // Convert the reservation date to the Paris time zone
    const dateReserv = moment(createReservationDto.dateReserv).toDate();

    // Convert the end date of the rental to the Paris time zone
    const dateFinloc = moment(createReservationDto.dateFinloc).toDate();

    const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in a day
    const nbJours = Math.ceil((dateFinloc.getTime() - dateReserv.getTime()) / oneDay);
    console.log(nbJours);
    const prixTotal = nbJours * vehicule.prix;
    createReservationDto.prixTotal = prixTotal; // update the reservation DTO with the total price
    const newRes = await new this.ResModel(createReservationDto).save();

    /* await this.VehModel.findByIdAndUpdate(createReservationDto.vehiculeId, {
      $push: { reservationId: newRes },
    }); */


    // Add the reservation to the user and insurance records
    await this.UserModel.findByIdAndUpdate(createReservationDto.userId, {
      $push: { reservation: newRes },
    });

    await this.VehModel.findByIdAndUpdate(createReservationDto.vehiculeId, {
      $push: { reservationId: newRes },
    });

    await this.AssModel.findByIdAndUpdate(createReservationDto.assuranceId, {
      $push: { reservation: newRes },
    });

    await this.NotModel.findByIdAndUpdate(createReservationDto.notification, {
      $push: { reservation: newRes },
    });
    return newRes;


  }

  async findById(id: string): Promise<Ires> {
    return this.ResModel.findById(id);
  }

  async getReservationByUserId(userId: string): Promise<Ires[]> {
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      const reservations = await this.ResModel.find({ userId: userId }).populate('assuranceId')
      if (reservations.length == 0) {
        throw new NotFoundException({ message : "no reservation exist !"});
      }
      return reservations;
    }else{
      throw new NotFoundException({ message : "Id is not correct !"});
    }
  }

  async getAlldateReserv(dateReserv: Date): Promise<Ires[]> {
    const existingdateReserv = await this.ResModel.find({ dateReserv: dateReserv }).exec();
    if (!existingdateReserv) {
      throw new NotFoundException(`date Fin localisation #${dateReserv} not found`);
    }
    return existingdateReserv;
  }

  async getAlldateFinloc(dateFinloc: Date): Promise<Ires[]> {
    const existingdateFinloc = await this.ResModel.find({ dateFinloc: dateFinloc }).exec();
    if (!existingdateFinloc) {
      throw new NotFoundException(`date Fin localisation #${dateFinloc} not found`);
    }
    return existingdateFinloc;
  }

  async getnumPermis(numPermis: number): Promise<Ires> {
    const existingnumPermis = await this.ResModel.findOne({ numPermis: numPermis }).exec();
    if (!existingnumPermis) {
      throw new NotFoundException(`numéro de permis #${numPermis} not found`);
    }
    return existingnumPermis;
  }

  async updateRes(ResId: string, updateReservationDto: UpdateReservationDto): Promise<Ires> {
    const existingreserv = await this.ResModel.findByIdAndUpdate(ResId, updateReservationDto, { new: true });
    if (!existingreserv) {
      throw new NotFoundException(`Reservation #${ResId} not found`);
    }
    return existingreserv;
  }
  async getAllRes(): Promise<Ires[]> {
    const ResData = await this.ResModel.find().populate("userId").populate("vehiculeId").populate("assuranceId").select("-__v");
    if (!ResData || ResData.length == 0) {
      throw new NotFoundException('Reservation data not found!');
    }
    return ResData;
  }
  async getRes(ResId: string): Promise<Ires> {
    const existingreserv = await this.ResModel.findById(ResId).populate("userId").populate("vehiculeId").populate("assuranceId").exec();
    if (!existingreserv) {
      throw new NotFoundException(`Reservation #${ResId} not found`);
    }
    return existingreserv;
  }



  async deleteReserv(ResId: string): Promise<Ires> {
    const Resdeleted = await this.ResModel.findById(ResId);
    
    await this.VehModel.findByIdAndUpdate(Resdeleted.vehiculeId, {
      $pull: { reservationId: Resdeleted._id },
    });

    await this.VehModel.findByIdAndUpdate(Resdeleted.vehiculeId, {disponible:true}
    );

    await this.UserModel.findByIdAndUpdate(Resdeleted.userId, {
      $pull: { reservation: Resdeleted._id },
    });

    await this.AssModel.findByIdAndUpdate(Resdeleted.assuranceId, {
      $pull: { reservation: Resdeleted._id },
    });

    await this.NotModel.findByIdAndUpdate(Resdeleted.notification, {
      $pull: { reservation: Resdeleted._id },
    });

    const deletedRes = await this.ResModel.findByIdAndDelete(ResId);

    if (!deletedRes) {
      throw new NotFoundException(`Reservation #${ResId} not found`);
    }

    return deletedRes;
  }




  async ResAss(ResId: string, updateReservationDto: UpdateReservationDto): Promise<Ires> {
    // Récupérer la réservation correspondante

    const reservation = await this.ResModel.findById(ResId);
    console.log("reserva", reservation)
    // Vérifier si une assurance a été sélectionnée

    const assuranceSelectionnee = updateReservationDto.assuranceId != "";
    console.log("rest", assuranceSelectionnee)
    const assurance = await this.AssModel.findById(updateReservationDto.assuranceId);
    console.log("ass", assurance)


    // Initialiser le prix total
    let prixFinal = reservation.prixTotal;

    // Si une assurance a été sélectionnée, récupérer son prix et l'ajouter au prix total

    if (assurance != null) {
      const prixAssurance = assurance.prix;

      prixFinal += prixAssurance;
      console.log("test", prixFinal)
      // Mettre à jour le prix total de la réservation et sauvegarder dans la base de données
      reservation.prixTotal = prixFinal;
      await reservation.save();
      await this.AssModel.findByIdAndUpdate(assurance._id, {
        $push: { reservation: reservation },
      });
    }

    return reservation;
  }


  async createResWithAss(createReservationDto: CreateReservationDto, assuranceId): Promise<Ires> {
    const newRes = await this.createRes(createReservationDto);

    // Récupérer le prix de l'assurance
    const assurance = await this.AssModel.findById(assuranceId);
    const assurancePrice = assurance.prix;

    const prixFinal = newRes.prixTotal + assurancePrice;
    newRes.assuranceId = assuranceId;
    newRes.prixTotal = prixFinal;
    await newRes.save();

    // Associer l'assurance à la réservation
    await this.AssModel.findByIdAndUpdate(assuranceId, {
      $push: { reservation: newRes },
    });

    return newRes;
  }
}