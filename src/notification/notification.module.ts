import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './entities/notification.entity';
import { ReservationSchema } from 'src/reservation/entities/reservation.entity';

@Module({

  imports:[MongooseModule.forFeature([{ name: 'notification', schema:NotificationSchema},{ name: 'reservation', schema:ReservationSchema}])
],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
