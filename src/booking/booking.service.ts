import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BookingMicroserviceOptions } from '../microservices/booking/microservice.options';
import { BookingDto } from './booking.dto';
import { CreateBooking } from '../microservices/booking/booking.interfaces';
import { tap } from 'rxjs/operators';

interface BookingMicroService {
  getList(query: {}): Observable<any>;
  create(booking: CreateBooking): Observable<any>;
}

@Injectable()
export class BookingService implements OnModuleInit {
  @Client(BookingMicroserviceOptions)
  private client: ClientGrpc;

  private bookingService: BookingMicroService;

  onModuleInit() {
    this.bookingService = this.client.getService('BookingService');
  }

  getBookings() {
    return this.bookingService.getList({});
  }

  createBooking(booking: BookingDto) {
    return this.bookingService.create(booking);
  }
}
