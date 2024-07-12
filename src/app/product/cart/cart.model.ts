export class Cart {
  user_id: number;
  product_id: number;
  product_name: string;
  image: string;
  price: number;
  quantity: number;
  status: string;

  constructor(
    user_id: number,
    product_id: number,
    product_name: string,
    image: string,
    price: number,
    quantity: number,
    status: string
  ) {
    (this.user_id = user_id), (this.product_id = product_id);
    this.product_name = product_name;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.status = status;
  }
}
