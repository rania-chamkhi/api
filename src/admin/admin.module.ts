import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSchema } from './entities/admin.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from 'src/reservation/reservation.service';
import { ReservationSchema } from 'src/reservation/entities/reservation.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { VehiculeSchema } from 'src/vehicule/entities/vehicule.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'admin', schema:AdminSchema} , { name: 'reservation', schema:ReservationSchema} ,
  {name: 'vehicule' , schema: VehiculeSchema}, {name: 'user' , schema: userSchema} ])
],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
})
export class AdminModule {}
