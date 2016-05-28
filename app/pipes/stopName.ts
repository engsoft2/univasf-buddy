import {Injectable, Pipe} from '@angular/core';

@Pipe({ name: 'stopname' })

@Injectable()
export class StopNamePipe {
  isTimePast: boolean;
  static   START_PAST: string[] = ['Saiu de Jua', 'Saiu de Petro', 'Saiu do CCA'];
  static START_FUTURE: string[] = ['Saindo de Jua', 'Saindo de Petro', 'Saindo do CCA'];
  static     END_PAST: string[] = ['Chegou em Jua', 'Chegou em Petro', 'Chegou no CCA'];
  static   END_FUTURE: string[] = ['Chegando em Jua', 'Chegando em Petro', 'Chegando no CCA'];
  /*
    Takes a value and makes it lowercase.
   */
  transform(stopName: string, stopLocation: string, hour: number) {
    this.isTimePast = Date.now() > hour;

    if (stopLocation === 'first') {
      return this.formatStar(stopName, hour);
    } else if (stopLocation === 'last') {
      return this.formatEnd(stopName, hour);
    }
  }

  formatStar(name, hour) {
    if (name.indexOf('jua') > -1) {
      if (this.isTimePast) {
        return StopNamePipe.START_PAST[0];
      }
      return StopNamePipe.START_FUTURE[0];
    } else if (name.indexOf('petro') > -1) {
      if (this.isTimePast) {
        return StopNamePipe.START_PAST[1];
      }
      return StopNamePipe.START_FUTURE[0];
    } else {
      if (this.isTimePast) {
        return StopNamePipe.START_PAST[2];
      }
      return StopNamePipe.START_FUTURE[0];
    }
  }

  formatEnd(name, hour) {
    if (name.indexOf('jua') > -1) {
      if (this.isTimePast) {
        return StopNamePipe.END_PAST[0];
      }
      return StopNamePipe.END_FUTURE[0];
    } else if (name.indexOf('petro') > -1) {
      if (this.isTimePast) {
        return StopNamePipe.END_PAST[1];
      }
      return StopNamePipe.END_FUTURE[1];
    } else {
      if (this.isTimePast) {
        return StopNamePipe.END_PAST[2];
      }
      return StopNamePipe.END_FUTURE[2];
    }
  }
}
