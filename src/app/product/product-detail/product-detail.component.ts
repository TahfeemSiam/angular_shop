import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { AppModule } from '../../app.module';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/cart.model';
import {
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { UserService } from '../../user/user.service';
import { Review } from '../../user/review.model';
import { Reviews } from '../../user/reviews.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AppModule, AngularMaterialModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent implements OnInit {
  product!: Observable<Product[]>;
  productReviews!: Observable<Reviews[]>;
  productId!: number;
  productReview!: string;
  addingReview: boolean = false;

  change: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
      this.product = this.productService.getProduct(String(this.productId));
      this.productReviews = this.productService.getProductReview(
        this.productId
      );
    });
  }

  makeImageLarge(image: string) {
    this.dialog.open(ImageDialog, {
      data: {
        image,
      },
    });
  }

  add(
    userId: number,
    id: number,
    name: string,
    image: string,
    price: number,
    qunatity: any,
    status: string
  ) {
    this.cartService.addToCart(
      new Cart(userId, id, name, image, price, Number(qunatity._value), status)
    );
  }

  addProductReview() {
    if (
      this.productReview !== '' &&
      localStorage.getItem('username') &&
      localStorage.getItem('jwt')
    ) {
      this.addingReview = true;
      const review = new Review(
        Number(this.productId),
        Number(this.cookieService.get('user')),
        String(localStorage.getItem('username')),
        this.productReview
      );
      this.userService.addReview(review).subscribe({
        next: () => {
          this.productReviews = this.productService.getProductReview(
            this.productId
          );
          this.addingReview = false;
        },
        error: (error) => console.log(error),
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'image-dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class ImageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
