import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'stopname'
})

@Injectable()
export class StopNamePipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]) {
    value = value.toLowerCase();
    if (value.indexOf('jua') > -1) {
      return 'de Jua';
    } else if (value.indexOf('petro') > -1) {
      return 'de Petro';
    } else {
      return 'do CCA';
    }
  }
}
