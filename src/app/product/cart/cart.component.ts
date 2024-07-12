import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CartService } from './cart.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from './cart.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AppModule, AngularMaterialModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  dataSource: Cart[] = [];
  totalAmount!: number;

  constructor(private cartService: CartService, public dialog: MatDialog) {}
  ngOnInit() {
    if (
      !this.cartService.getCartData() ||
      !this.cartService.getTotalCartAmount()
    ) {
      this.totalAmount = 0;
      this.dataSource = [];
    } else {
      this.dataSource = this.cartService.getCartData();

      this.totalAmount = this.cartService.getTotalCartAmount();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmOrderDialog);

    dialogRef.afterClosed().subscribe();
  }

  displayedColumns: string[] = ['name', 'price', 'image', 'quantity', 'remove'];

  removeProduct(id: number) {
    this.cartService.removeFromCart(id);
    this.dataSource = this.cartService.getCartData();
    this.totalAmount = this.cartService.getTotalCartAmount();
  }
}

@Component({
  selector: 'confirm-dialog-content',
  templateUrl: 'confirm-order-dialog-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class ConfirmOrderDialog {
  cart: Cart[] = [];
  constructor(
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  placeOrder() {
    if (this.cookieService.get('admin') || this.cookieService.get('user')) {
      this.cart = this.cartService.getCartData();
      this.cart.forEach((e: Cart) => {
        e.user_id = Number(this.cookieService.get('admin'))
          ? Number(this.cookieService.get('admin'))
          : Number(this.cookieService.get('user'));
        this.cartService.confirmOrder(e);
      });
      this.cartService.clearCart();
      this.dialog
        .open(OrderConfirmedDialog)
        .afterClosed()
        .subscribe({
          next: () => {
            window.location.reload();
          },
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

@Component({
  selector: 'order-confirmed-dialog-content',
  templateUrl: 'order-confirmed-dialog-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class OrderConfirmedDialog {}
