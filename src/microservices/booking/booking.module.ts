import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { bookingsProvider } from './booking.provider';
import { BookingService } from './booking.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    bookingsProvider,
  ],
  controllers: [
    BookingService,
  ],
  exports: [],
})
export class BookingModule {}
