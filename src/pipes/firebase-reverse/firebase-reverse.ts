import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class FirebaseReversePipe implements PipeTransform {
  transform(value: any) {
    
    if(!value) return
    return value.reverse()
  }
}
