import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [AppModule, AngularMaterialModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  upload: boolean = false;
  formInputs: boolean = false;
  showProgressBar: boolean = false;
  submitButton: boolean = false;
  inputFileName!: File;
  product!: any;
  showFashsionSubCategory: boolean = false;
  showElectronicsSubCategory: boolean = false;
  showFurnitureSubCategory: boolean = false;

  constructor(private adminService: AdminService) {}

  productInfo(form: NgForm) {
    if (form.form.valid) {
      this.product = form.form.value;

      console.log(this.product);

      this.formInputs = true;
      this.showProgressBar = true;

      setTimeout(() => {
        this.upload = true;
      }, 2000);
    }

    console.log(form.form.value);
  }

  getInputFileName(event: any) {
    this.inputFileName = event.target.files;
    console.log(this.inputFileName);
  }

  submit() {
    this.adminService.createProduct(this.inputFileName, this.product);
    this.adminService.productCreated.subscribe((res) => {
      if (res) {
        this.submitButton = true;
      }
    });
  }

  fashion() {
    this.showFashsionSubCategory = true;
    this.showElectronicsSubCategory = false;
    this.showFurnitureSubCategory = false;
  }

  electronics() {
    this.showFashsionSubCategory = false;
    this.showElectronicsSubCategory = true;
    this.showFurnitureSubCategory = false;
  }

  furniture() {
    this.showFashsionSubCategory = false;
    this.showElectronicsSubCategory = false;
    this.showFurnitureSubCategory = true;
  }

  hideSubCategory() {
    this.showFashsionSubCategory = false;
    this.showElectronicsSubCategory = false;
    this.showFurnitureSubCategory = false;
  }
}
