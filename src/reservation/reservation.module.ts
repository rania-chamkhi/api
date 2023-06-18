import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from './entities/reservation.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { VehiculeSchema } from 'src/vehicule/entities/vehicule.entity';
import { AssSchema } from 'src/assurance/entities/assurance.entity';
import { NotificationSchema } from 'src/notification/entities/notification.entity';


@Module({
  imports:[MongooseModule.forFeature([{ name: 'reservation', schema:ReservationSchema} , {name: 'user' , schema: userSchema},{name: 'vehicule' , schema: VehiculeSchema},
                                      {name: 'assurance' , schema: AssSchema}, {name: 'notification' , schema: NotificationSchema}])
],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
