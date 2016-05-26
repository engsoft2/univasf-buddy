import {Injectable, Pipe} from '@angular/core';

/*
  Generated class for the ToDate pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'todate'
})
@Injectable()
export class ToDatePipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]) {
    // value = value + ''; // make sure it's a string
    // hh:mm:00
    let d = new Date();
    d.setHours(Number(value.slice(0,2)), Number(value.slice(3,5)), 0, 0);
    return d;
    // return  new Date(0, 0, 0, Number(value.slice(0,2)), Number(value.slice(3,5)), 0, 0);
    // return value.toLowerCase();
  }
}
