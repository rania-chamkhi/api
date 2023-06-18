import { Module } from '@nestjs/common';
import { AgenceService } from './agence.service';
import { AgenceController } from './agence.controller';
import { AgSchema } from './entities/agence.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports:[MongooseModule.forFeature([{ name: 'agence', schema:AgSchema}])
],
  controllers: [AgenceController],
  providers: [AgenceService]
})
export class AgenceModule {}
