interface BookingItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  id: string;
  __v: number;
}

export type Book = BookingItem[];
