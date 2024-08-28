import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from './product.model';
import { Reviews } from '../user/reviews.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  fetchFeaturedProducts() {
    return this.http
      .get<Product[]>('http://localhost:4000/api/product/featuredProducts')
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getProduct(id: string) {
    return this.http
      .get<Product[]>(`http://localhost:4000/api/product/${id}`)
      .pipe(map((res: any) => res.data));
  }

  getProductReview(productId: number) {
    return this.http
      .get<Reviews[]>(`http://localhost:4000/api/product/review/${productId}`)
      .pipe(map((res: any) => res.reviews));
  }
}
