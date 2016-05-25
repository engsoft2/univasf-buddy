import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BusDetails} from '../../pages/bus-details/bus-details';

@Component({
  selector: 'route-card',
  templateUrl: 'build/components/route-card/route-card.html'
})

export class RouteCard {
  
  @Input() routes: any[];

  constructor(public nav: NavController) { }

  goToBusDetail(bus) {
    this.nav.push(BusDetails, bus);
  }
}
