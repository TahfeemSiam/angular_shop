import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  inject,
} from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdersService } from '../../product/orders.service';
import { AdminService } from '../admin.service';
import { Order } from './order.interface';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [AppModule, AngularMaterialModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
})
export class OrdersTableComponent {
  orderService = inject(OrdersService);
  router = inject(Router);
  ELEMENT_DATA: Order[] = [];
  displayedColumns: string[] = [
    'orderId',
    'userId',
    'productId',
    'name',
    'price',
    'image',
    'quantity',
    'status',
    'confirm',
  ];
  dataSource = new MatTableDataSource<Order>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  clickedRows = new Set<Order>();
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.orderService.fetchAllOrders().subscribe((res: Order[]) => {
      this.dataSource.data = res;
    });
  }

  readonly dialog = inject(MatDialog);

  openDialog(order: Order) {
    this.dialog.open(ConfirmOrderDialog, {
      data: { userId: order.user_id, prodId: order.product_id },
    });
  }
}

@Component({
  selector: 'confirm-order-dialog',
  templateUrl: 'confirm-order-dialog.html',
  standalone: true,
  imports: [AngularMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmOrderDialog {
  adminService = inject(AdminService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: number; prodId: number }
  ) {}

  confirmOrder(userId: number, prodId: number) {
    this.adminService.confirmOrder(userId, prodId);
  }
}
