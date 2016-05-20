import {Page, NavController} from 'ionic-angular';
import {BusResult} from '../bus-result/bus-result';


@Page({
  templateUrl: 'build/pages/search-bus/search-bus.html',
})
export class SearchBus {
  origem: string;
  destino : string;
  cities : any[];
  hours: any[];

  constructor(public nav: NavController) {
      this.cities = [
          { id: 0, name: "JUAZEIRO" },
          { id: 1, name: "PETROLINA" },
          { id: 2, name: "CIENCIAS AGRARIAS" }
      ];

      this.origem = this.cities[0].name;
      this.destino = this.cities[1].name;

      this.hours = [
          {name: "Manha", isChecked: true},
          {name: "Tarde", isChecked: false},
          {name: "Noite", isChecked: false},
      ]
  }

  buscar() {
      this.nav.push(BusResult, {destino: this.destino, origem: this.origem, hours: this.hours});
  }
}
