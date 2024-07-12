export interface Order {
  order_id: number;
  user_id: number;
  product_id: number;
  product_name: string;
  price: number;
  image: string;
  quantity: number;
  status: string;
}
