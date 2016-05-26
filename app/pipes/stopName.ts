import {Injectable, Pipe} from '@angular/core';

/*
  Generated class for the StopName pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'stopname'
})
@Injectable()
export class StopNamePipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]) {
    // value = value + ''; // make sure it's a string
    value = value.toLowerCase();
    if (value.indexOf('jua') > -1 ) {
      return 'de Jua';
    } else if (value.indexOf('petro') > -1) {
      return 'de Petro';
    } else {
      return 'do CCA';
    }
    // return value.toLowerCase();
  }
}
