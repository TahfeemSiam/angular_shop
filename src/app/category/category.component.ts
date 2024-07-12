import { Component } from '@angular/core';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {}
