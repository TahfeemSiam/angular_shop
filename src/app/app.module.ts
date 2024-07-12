import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ROUTES, RouterModule } from '@angular/router';
import { SubstringPipe } from './substring.pipe';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, SubstringPipe],
  exports: [CommonModule, RouterModule, FormsModule, SubstringPipe],
})
export class AppModule {}
