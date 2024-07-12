export class Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_condition: string;
  product_category: string;
  product_sub_category: string;
  product_available: string;
  image_1: string;
  image_2: string;
  image_3: string;
  max_quantity: number;
  search: string;

  constructor(
    proudct_id: number,
    product_name: string,
    product_price: number,
    product_condition: string,
    product_category: string,
    product_sub_category: string,
    product_available: string,
    image_1: string,
    image_2: string,
    image_3: string,
    max_quantity: number,
    search: string
  ) {
    this.product_id = proudct_id;
    this.product_name = product_name;
    this.product_price = product_price;
    this.product_condition = product_condition;
    this.product_category = product_category;
    this.product_sub_category = product_sub_category;
    this.product_available = product_available;
    this.image_1 = image_1;
    this.image_2 = image_2;
    this.image_3 = image_3;
    this.max_quantity = max_quantity;
    this.search = search;
  }
}
