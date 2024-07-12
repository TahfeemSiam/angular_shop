class Product {
  constructor(
    product_name,
    product_price,
    product_condition,
    product_category,
    product_sub_category,
    product_available,
    image_1,
    image_2,
    image_3,
    max_quantity,
    search
  ) {
    this.product_name = product_name;
    (this.product_price = product_price),
      (this.product_condition = product_condition);
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

module.exports = Product;
