import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, AppModule, AngularMaterialModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  showSideNav = true;

  constructor(private router: Router) {}

  navigateToAddProduct() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/addProduct']);
    });
  }

  sideNavToggle() {
    if (this.showSideNav) {
      this.showSideNav = false;
    } else {
      this.showSideNav = true;
    }
  }
}
