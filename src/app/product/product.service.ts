import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from './product.model';

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
}
