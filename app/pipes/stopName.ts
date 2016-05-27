import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'stopname'
})

@Injectable()
export class StopNamePipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args: string, hour: string) {
    value = value.toLowerCase();

    if (args === 'inicial') {
      console.log('inicial')
      return this._FormatInicial(value, hour);
    } else if (args === 'final') {
      console.log('final')
      return this._FormatFinal(value, hour);
    }
  }

  _parseHour(date) {
    let a = new Date();
    let b = new Date();

    b.setHours(Number(date.slice(0, 2)))
    b.setMinutes(Number(date.slice(3, 5)))

    return a > b;
  }

  _FormatInicial(name, hour) {
    if (name.indexOf('jua') > -1) {
      if (this._parseHour(hour)) {
        return 'Saiu de Jua'
      }
      return 'Saindo de Jua';
    } else if (name.indexOf('petro') > -1) {
      if (this._parseHour(hour)) {
        return 'Saiu de Petro'
      }
      return 'Saindo de Petro';
    } else {
      if (this._parseHour(hour)) {
        return 'Saiu do CCA'
      }
      return 'Saindo do CCA';
    }
  }

  _FormatFinal(name, hour) {
    if (name.indexOf('jua') > -1) {
      if (this._parseHour(hour)) {
        return 'Chegou em Jua'
      }
      return 'Chegando em Jua';
    } else if (name.indexOf('petro') > -1) {
      if (this._parseHour(hour)) {
        return 'Chegou em Petro'
      }
      return 'Chegando em Petro';
    } else {
      if (this._parseHour(hour)) {
        return 'Chegou no CCA'
      }
      return 'Chegando no CCA';
    }
  }
}
