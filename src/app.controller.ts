import { Controller, Get ,Param,StreamableFile} from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("file/:folder/:img")
  getFile(@Param('img') Img,@Param('folder')folder):StreamableFile{
    const file = createReadStream(join(process.cwd(), './upload/' +folder+'/' +Img));
    return new StreamableFile(file);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
