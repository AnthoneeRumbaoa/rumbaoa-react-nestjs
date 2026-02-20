import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [GuestbookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}