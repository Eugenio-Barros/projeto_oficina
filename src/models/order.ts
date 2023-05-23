export interface Order {
  order_number: string;
  total?: number;
}

export interface OrderData {
  user: string;
  car: string;
  items: string[];
}
