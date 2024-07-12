import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { AppModule } from '../../app.module';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppModule, AngularMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  cardWidth = '600px';
  FormFieldwidth = '400px';

  constructor(private userService: UserService) {}

  userLogin(form: NgForm) {
    if (form.valid) {
      this.userService.LoginUser(form.form.value);
    }
  }
}
