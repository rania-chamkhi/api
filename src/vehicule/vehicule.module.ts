import { Module } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { VehiculeController } from './vehicule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiculeSchema } from './entities/vehicule.entity';
import { ReservationSchema } from 'src/reservation/entities/reservation.entity';
import { AgSchema } from 'src/agence/entities/agence.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'vehicule', schema:VehiculeSchema} ,{name: 'reservation' , schema: ReservationSchema},{name: 'agence' , schema: AgSchema}])
],
  controllers: [VehiculeController],
  providers: [VehiculeService]
})
export class VehiculeModule {}
