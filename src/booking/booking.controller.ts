import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BookingService } from './booking.service';
import { BookingDto } from './booking.dto';

@Controller('booking')
export class BookingController {
  constructor(
    private bookingService: BookingService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() booking: BookingDto) {
    return this.bookingService.createBooking(booking);
  }

  @UseGuards(AuthGuard)
  @Get()
  list() {
    return this.bookingService.getBookings();
  }
}
