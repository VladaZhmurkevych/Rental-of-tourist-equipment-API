import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { BookingList, CreateBooking } from './booking.interfaces';

@Controller()
export class BookingService {
  constructor(
    @Inject('BOOKINGS_REPOSITORY')
    private bookingRepository: Repository<Booking>,
  ) {}

  @GrpcMethod('BookingService', 'Create')
  create({ item, price, endDate, startDate, user }: CreateBooking) {
    const booking = new Booking();
    booking.endDate = endDate;
    booking.item_id = item;
    booking.price = price;
    booking.startDate = startDate;
    booking.user_id = user;
    return this.bookingRepository.save(booking);
  }

  @GrpcMethod('BookingService', 'GetList')
  async getList(): Promise<BookingList> {
    const data = await this.bookingRepository.find();
    console.log(data)
    return { data };
  }
}
