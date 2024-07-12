import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../product/product.model';
import { AdminService } from '../admin.service';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
})
export class ProductsTableComponent {
  displayedColumns: string[] = [
    'product_id',
    'product_name',
    'product_price',
    'product_category',
    'image_1',
    'max_quantity',
    'search',
    'delete',
    'update',
  ];

  products: Product[] = [];

  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.adminService.fetchProducts().subscribe((res: Product[]) => {
      this.products = res;
      this.dataSource.data = this.products;
    });
  }

  delete(id: number) {
    this.adminService.deleteProduct(id).subscribe((res) => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Product) => u.product_id !== id
      );
    });
  }

  editProductDialog() {
    this.dialog.open(EditProductDialog);
  }
}

@Component({
  selector: 'edit-product-dialog',
  templateUrl: 'edit-product-dialog.html',
  standalone: true,
  imports: [AngularMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductDialog {}
