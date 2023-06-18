import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './entities/contact.entity';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { EmailService } from './mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'contact', schema: ContactSchema },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService , EmailService],
})
export class ContactModule {}
