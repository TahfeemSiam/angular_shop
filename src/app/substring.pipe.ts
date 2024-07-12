import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring',
  standalone: true,
})
export class SubstringPipe implements PipeTransform {
  transform(value: string) {
    return value.substring(0, 21);
  }
}
