import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as level from 'level';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const db=level("./db111")
    db.open()
    db.put("1",{name: "Phong", age:22})
    db.close()
    return this.appService.getHello();
    
  }
}
