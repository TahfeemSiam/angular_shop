import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  fetchAllOrders() {
    return this.http
      .get('http://localhost:4000/api/order')
      .pipe(map((res: any) => res.data));
  }

  fetchOrdersByUserId(userId: number) {
    return this.http.get(`http://localhost:4000/api/order/user/${userId}`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
