class Order {
  constructor(
    user_id,
    product_id,
    product_name,
    image,
    price,
    quantity,
    pending
  ) {
    this.user_id = user_id;
    this.product_id = product_id;
    this.product_name = product_name;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
    this.pending = pending;
  }
}

module.exports = Order;
