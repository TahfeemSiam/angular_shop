import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, AppModule, AngularMaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  cardWidth = '600px';
  FormFieldwidth = '400px';

  constructor(
    private responsive: BreakpointObserver,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.responsive
      .observe([
        Breakpoints.Small,
        Breakpoints.Large,
        Breakpoints.Tablet,
        Breakpoints.XSmall,
      ])
      .subscribe((val) => {
        if (this.responsive.isMatched(Breakpoints.Small)) {
          this.FormFieldwidth = '400px';
          this.cardWidth = '500px';
        }

        if (this.responsive.isMatched(Breakpoints.XSmall)) {
          this.FormFieldwidth = '300px';
          this.cardWidth = '350px';
        }

        if (
          this.responsive.isMatched(Breakpoints.Tablet) ||
          this.responsive.isMatched(Breakpoints.Large)
        ) {
          this.FormFieldwidth = '400px';
          this.cardWidth = '600px';
        }
      });
  }

  registerUser(form: NgForm) {
    if (
      form.valid &&
      form.form.value.password === form.form.value.confirmPassword
    ) {
      this.userService.createUser(form.form.value);
    }
  }
}
