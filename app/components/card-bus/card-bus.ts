import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BusDetails} from '../../pages/bus-details/bus-details';

@Component({
  selector: 'card-bus',
  templateUrl: 'build/components/card-bus/card-bus.html'
})

export class CardBus {
  // @Input() data : any[];
  @Input() buses: any[];
  constructor(public nav: NavController) { }

  goToBusDetail(bus) {
    this.nav.push(BusDetails, bus);
  }

}
