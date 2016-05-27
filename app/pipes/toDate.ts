import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'todate'
})

@Injectable()
export class ToDatePipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]) {
    // hh:mm:00
    let d = new Date();

    d.setHours(Number(value.slice(0, 2)), Number(value.slice(3, 5)), 0, 0);

    return d;
  }
}
