import { Component, inject } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppModule } from '../../app.module';
import { Observable } from 'rxjs';
import { Order } from '../../admin/orders-table/order.interface';
import { OrdersService } from '../../product/orders.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [AppModule, AngularMaterialModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent {
  cookieService = inject(CookieService);
  orderService = inject(OrdersService);
  route = inject(ActivatedRoute);

  orders!: Observable<Order[]>;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.orders = this.orderService.fetchOrdersByUserId(Number(params['id']));
    });
  }
  showFiller = false;
}
