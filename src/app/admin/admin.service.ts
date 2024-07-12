import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  images: string[] = [];
  productInfo!: any;
  productCreated = new Subject<boolean>();
  products: Product[] = [];

  httpHeaders: HttpHeaders = new HttpHeaders({
    authorization: String(localStorage.getItem('jwt')),
    admin: String(localStorage.getItem('admin')),
  });

  constructor(private http: HttpClient) {}

  createProduct(inputFileName: File, form: any) {
    this.productInfo = form;
    this.images.length = 0;
    if (Object.keys(inputFileName).length < 3) {
      console.error('Please Select 3 Images');
    } else {
      for (let i = 0; i < Object.keys(inputFileName).length; i++) {
        const formData = new FormData();
        formData.append('images', Object.values(inputFileName)[i]);
        this.http
          .post('http://localhost:4000/upload', formData, {
            headers: this.httpHeaders,
          })
          .subscribe({
            next: (res: any) => {
              this.images.push(res.images[0].filename);
              this.productInfo.image_1 = this.images[0];
              this.productInfo.image_2 = this.images[1];
              this.productInfo.image_3 = this.images[2];

              if (this.images.length == 3) {
                this.http
                  .post('http://localhost:4000/addProduct', this.productInfo, {
                    headers: this.httpHeaders,
                  })
                  .subscribe((res) => {
                    this.productCreated.next(true);
                    console.log(res);
                    console.log(this.productInfo);
                  });
              }
            },

            error: (error) => console.log(error),
          });
      }
    }
  }

  fetchProducts() {
    return this.http.get('http://localhost:4000/api/product/getProducts').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:4000/deleteProduct/${id}`, {
      headers: this.httpHeaders,
    });
  }

  confirmOrder(userId: number, prodId: number) {
    this.http
      .patch(
        `http://localhost:4000/confirmOrder/${userId}/${prodId}`,
        {
          status: 'confirmed',
        },
        { headers: this.httpHeaders }
      )
      .subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error),
      });
  }
}
