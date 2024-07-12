import { Component, OnInit, inject } from '@angular/core';
import { AppModule } from '../app.module';
import { CategoryComponent } from '../category/category.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-home-products',
  standalone: true,
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.scss',
  imports: [
    AppModule,
    AngularMaterialModule,
    CategoryComponent,
    ProductComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeProductsComponent implements OnInit {
  products!: Observable<Product[]>;

  productService = inject(ProductService);

  ngOnInit() {
    this.products = this.productService.fetchFeaturedProducts();
  }
}
