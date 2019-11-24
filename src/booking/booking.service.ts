import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BookingMicroserviceOptions } from '../microservices/booking/microservice.options';

interface BookingMicroService {
  getList(query): Observable<any>;
  create(): Observable<any>;
}

@Injectable()
export class BookingService implements OnModuleInit {
  @Client(BookingMicroserviceOptions)
  private client: ClientGrpc;

  private bookingService: BookingMicroService;

  onModuleInit() {
    console.log(this.client)
    this.bookingService = this.client.getService<BookingMicroService>('BookingService');
  }

  getBookings() {
    return this.bookingService.getList({});
  }

  createBooking() {}
}
