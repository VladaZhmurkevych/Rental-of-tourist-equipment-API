import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(
    private bookingService: BookingService
  ) {}
  @Post()
  create() {}

  @UseGuards(AuthGuard)
  @Get()
  list() {
    return this.bookingService.getBookings();
  }
}
