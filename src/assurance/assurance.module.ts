import { Module } from '@nestjs/common';
import { AssuranceService } from './assurance.service';
import { AssuranceController } from './assurance.controller';
import { AssSchema } from './entities/assurance.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports:[MongooseModule.forFeature([{ name: 'assurance', schema:AssSchema}])
],
  controllers: [AssuranceController],
  providers: [AssuranceService]
})
export class AssuranceModule {}
