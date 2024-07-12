import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { CartService } from '../product/cart/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, AppModule, AngularMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  showFiller = false;
  showMenuIcon: boolean = false;

  authenticated!: boolean;
  showAdminDashBoardButton!: boolean;

  cartLenght!: number;
  userId!: string;

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private cartService: CartService,
    private breakPointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    if (
      this.cookieService.get('authenticated') &&
      this.cookieService.get('admin')
    ) {
      this.authenticated = true;
      this.showAdminDashBoardButton = true;
    } else if (
      this.cookieService.get('authenticated') &&
      this.cookieService.get('user')
    ) {
      this.authenticated = true;
      this.showAdminDashBoardButton = false;
      this.userId = this.cookieService.get('user');
    } else {
      this.authenticated = false;
      this.showAdminDashBoardButton = false;
    }

    this.breakPointObserver
      .observe([
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.Large,
        Breakpoints.XSmall,
      ])
      .subscribe(() => {
        if (
          this.breakPointObserver.isMatched(Breakpoints.Small) ||
          this.breakPointObserver.isMatched(Breakpoints.XSmall)
        ) {
          this.showMenuIcon = true;
        }

        if (
          this.breakPointObserver.isMatched(Breakpoints.Large) ||
          this.breakPointObserver.isMatched(Breakpoints.Medium)
        ) {
          this.showMenuIcon = false;
        }
      });

    this.cartService.getCartLenghtObs.subscribe({
      next: (res: any) => {
        this.cartLenght = res;
      },
    });

    if (!this.cartService.getCartLenght()) {
      this.cartLenght = 0;
    } else {
      this.cartLenght = this.cartService.getCartLenght();
    }

    // this.cartLenght = this.cartService.getCartLenght();
  }

  userLogout() {
    this.userService.logout();
    this.authenticated = false;
  }
}
