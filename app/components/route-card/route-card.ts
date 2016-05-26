import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RouteDetailsPage} from '../../pages/route-details/route-details';
import {StopNamePipe} from '../../pipes/stopName';
import {ToDatePipe} from '../../pipes/toDate';
import {TimeAgoPipe} from 'angular2-moment';
import * as moment from 'moment';
// import * as moment from 'moment/moment';

moment.lang('pt-br');
@Component({
  selector: 'route-card',
  templateUrl: 'build/components/route-card/route-card.html',
  pipes: [StopNamePipe, ToDatePipe, TimeAgoPipe]
})

export class RouteCard {

  @Input() routes: any[];

  constructor(public nav: NavController) {

   }

  goToBusDetail(bus) {
    this.nav.push(RouteDetailsPage, bus);
  }
}
