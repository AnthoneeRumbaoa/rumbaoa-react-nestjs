import { Module } from '@nestjs/common';
import { GuestbookController } from './guestbook.controller';

@Module({
  controllers: [GuestbookController],
})
export class GuestbookModule {}