import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RouteDetailsPage} from '../../pages/route-details/route-details';
import {StopNamePipe} from '../../pipes/stopName';
import {ToDatePipe} from '../../pipes/toDate';
import {TimeAgoPipe, DateFormatPipe} from 'angular2-moment';
import * as moment from 'moment';

@Component({
  selector: 'route-card',
  templateUrl: 'build/components/route-card/route-card.html',
  pipes: [StopNamePipe, ToDatePipe, TimeAgoPipe, DateFormatPipe]
})

export class RouteCard {

  @Input() routes: any[];

  constructor(public nav: NavController) {

   }

  goToRouteDetail(route) {
    this.nav.push(RouteDetailsPage, route);
  }
}

moment.locale('pt-br', {
    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
    // weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D [de] MMMM [de] YYYY',
        LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
        LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'em %s',
        past : '%s atrás',
        s : 'poucos segundos',
        m : 'um minuto',
        mm : '%d minutos',
        h : 'uma hora',
        hh : '%d horas',
        d : 'um dia',
        dd : '%d dias',
        M : 'um mês',
        MM : '%d meses',
        y : 'um ano',
        yy : '%d anos'
    },
    ordinalParse: /\d{1,2}º/,
    ordinal : '%dº'
});
