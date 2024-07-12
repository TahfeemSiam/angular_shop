import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ActivatedRoute, Params } from '@angular/router';
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

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AppModule, AngularMaterialModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent {
  product!: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.product = this.productService.getProduct(params['id']);
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
