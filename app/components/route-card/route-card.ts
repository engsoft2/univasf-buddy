import {Component, Input} from '@angular/core';
import {NavController}    from 'ionic-angular';
import {RouteDetailsPage} from '../../pages/pages';
import {RouteModel, StopModel} from '../../models/models';
import {TimeAgoPipe, DateFormatPipe} from 'angular2-moment';
import * as moment from 'moment';

@Component({
    selector: 'route-card',
    templateUrl: 'build/components/route-card/route-card.html',
    pipes: [TimeAgoPipe, DateFormatPipe]
})

export class RouteCard {

    @Input() routes: Array<RouteModel>;

    isTimePast: boolean;
    static   START_PAST: string[] = ['Saiu de Jua', 'Saiu de Petro', 'Saiu do CCA'];
    static START_FUTURE: string[] = ['Saindo de Jua', 'Saindo de Petro', 'Saindo do CCA'];
    static     END_PAST: string[] = ['Chegou em Jua', 'Chegou em Petro', 'Chegou no CCA'];
    static   END_FUTURE: string[] = ['Chegando em Jua', 'Chegando em Petro', 'Chegando no CCA'];

    constructor(public nav: NavController) { }

    goToRouteDetail(route: RouteModel): void {
        this.nav.push(RouteDetailsPage, route);
    }

    formatRouteInfo(stop: StopModel, stopLocation: string) {
      let stopName = stop.name.toLowerCase();
      let stopTime = stop.time;

      this.isTimePast = Date.now() > stopTime;

      if (stopLocation === 'first') {
        return this.formatFirst(stopName, stopTime);
      } else if (stopLocation === 'last') {
        return this.formatLast(stopName, stopTime);
      }
    }

    private formatFirst(name, hour) {
      if (name.indexOf('jua') > -1) {
        if (this.isTimePast) {
          return RouteCard.START_PAST[0];
        }
        return RouteCard.START_FUTURE[0];
      } else if (name.indexOf('petro') > -1) {
        if (this.isTimePast) {
          return RouteCard.START_PAST[1];
        }
        return RouteCard.START_FUTURE[1];
      } else {
        if (this.isTimePast) {
          return RouteCard.START_PAST[2];
        }
        return RouteCard.START_FUTURE[2];
      }
    }

    private formatLast(name, hour) {
      if (name.indexOf('jua') > -1) {
        if (this.isTimePast) {
          return RouteCard.END_PAST[0];
        }
        return RouteCard.END_FUTURE[0];
      } else if (name.indexOf('petro') > -1) {
        if (this.isTimePast) {
          return RouteCard.END_PAST[1];
        }
        return RouteCard.END_FUTURE[1];
      } else {
        if (this.isTimePast) {
          return RouteCard.END_PAST[2];
        }
        return RouteCard.END_FUTURE[2];
      }
    }
}

moment.locale('pt-br', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin: 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
    // weekdaysParseExact : true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
        LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
    },
    calendar: {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function() {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'em %s',
        past: '%s atrás',
        s: 'poucos segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um mês',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos'
    },
    // ordinalParse: /\d{1,2}º/,
    // ordinal: '%dº'
});
