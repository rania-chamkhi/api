import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inot } from './entities/interfaces/notification.interface';
import { Ires } from 'src/reservation/dto/interfaces/reservation.interface';

@Injectable()
export class NotificationService {

  constructor(
    @InjectModel('notification') private NotModel: Model<Inot>,
    @InjectModel('reservation') private ResModel: Model<Ires>

  ) {}
  async createnot(): Promise<any[]> {
    const currentDate = new Date();
    const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1);
    const reservations = await this.ResModel.find().populate("userId").exec();
    const notifications = [];

    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i];
      currentDateWithoutTime.setUTCHours(0,0,0,0);
      reservation.dateFinloc.setUTCHours(0,0,0,0);

      console.log("currentDateWithoutTime ",currentDateWithoutTime.getTime())
      console.log("currentDateWithoutTime ",reservation.dateFinloc.getTime())
      console.log("compare  ",reservation.dateFinloc.getTime()==currentDateWithoutTime.getTime())

      if(reservation.dateFinloc.getTime()==currentDateWithoutTime.getTime()) {

      
      const reserva = await this.ResModel.findById(reservation).populate("userId").populate("vehiculeId").exec();



      const newNot = await new this.NotModel({
        date: currentDate,
        contenu: "La réservation a expiré",
        reservation: reserva

      });
      await newNot.save()
      notifications.push({
        date: currentDate,
        contenu: "La réservation a expiré",
        reservation: reserva

      });
    }
    }

    return notifications;
  }




  

  async updateNot(
    NotId: string, updateNotificationDto: UpdateNotificationDto ): Promise<Inot> {
    const existingNotification = await this.NotModel.findByIdAndUpdate(NotId,  updateNotificationDto,{ new: true },
    );
    if (!existingNotification) {
      throw new NotFoundException(`Notification #${NotId} not found`);
    }
    return existingNotification;
  }
  async getAllnot(): Promise<Inot[]> {
    const NotificationData = await this.NotModel.find().populate("reservation").select('-__v');
    if (!NotificationData || NotificationData.length == 0) {
      throw new NotFoundException('Notifications data not found!');
    }
    return NotificationData;
  }
  async getNot(NotId: string): Promise<Inot> {
    const existingNotification = await this.NotModel.findById(
      NotId,
    ).populate("reservation").exec();
    if (!existingNotification) {
      throw new NotFoundException(`Notification #${NotId} not found`);
    }
    return existingNotification;
  }
 

  async deleteNot(NotId: string): Promise<Inot> {
    const deletedNot = await this.NotModel.findByIdAndDelete(
      NotId,
    );
    if (!deletedNot) {
      throw new NotFoundException(`Notification #${NotId} not found`);
    }
    return deletedNot;
  }
}
