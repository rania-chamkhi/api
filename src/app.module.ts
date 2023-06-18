import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { ReservationModule } from './reservation/reservation.module';
import { VehiculeModule } from './vehicule/vehicule.module';
import { AgenceModule } from './agence/agence.module';
import { AssuranceModule } from './assurance/assurance.module';
import { NotificationModule } from './notification/notification.module';
import { ContactModule } from './contact/contact.module';




@Module({

  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'projetpfe',
    }),  UserModule,ConfigModule.forRoot({isGlobal:true}), AuthModule, AdminModule, ReservationModule, VehiculeModule, AgenceModule, AssuranceModule, NotificationModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
