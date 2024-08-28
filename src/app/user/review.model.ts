export class Review {
  public product_id: number;
  public user_id: number;
  public username: string;
  public review: string;

  constructor(
    product_id: number,
    user_id: number,
    username: string,
    review: string
  ) {
    this.product_id = product_id;
    this.user_id = user_id;
    this.username = username;
    this.review = review;
  }
}
