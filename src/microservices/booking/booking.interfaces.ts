export interface CreateBooking {
  user: number;
  item: number;
  startDate: string;
  endDate: string;
  price: number;
}

export interface Booking {
  user_id: number;
  item_id: number;
  startDate: string;
  endDate: string;
  price: number;
  created_at: string;
}

export interface BookingList {
  data: Booking[];
}
