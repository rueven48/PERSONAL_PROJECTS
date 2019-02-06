import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'specialPipe'
})
export class SpecialPipe implements PipeTransform {

  /**
    @function transform - transform is function of PipeTransform class - take unique chars and remove
    it when pipe specialPipe is used.
    @param value
    @returns string
  **/
    transform(value: string): string {
        return value.replace(/[!@#$%^&*]/g, '');
    }

}
