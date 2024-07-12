import { Component, Input } from '@angular/core';
import { AppModule } from '../../app.module';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AppModule, AngularMaterialModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product;
}
