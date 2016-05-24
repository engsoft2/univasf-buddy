import {Page, NavParams} from 'ionic-angular';
import {CardBus} from '../../components/card-bus/card-bus';

@Page({
  templateUrl: 'build/pages/bus-result/bus-result.html',
  directives: [CardBus]

})

export class BusResult {
    data : any;
    buses : any[];

  constructor(params: NavParams) {
      this.data = params.data;
      this.buses = [{
        name : "A", via: "Via Batalhão PM/Av. Nações",
        stops: [
          { hour: "6:10", loc: "UNIVASF Campus Juazeiro/BA" },
          { hour: "6:12", loc: "Sanfra Motos" },
          { hour: "6:15", loc: "UNIVASF Campus Juazeiro/BA" },
          { hour: "6:20", loc: "Estação Velha / Cooperativa Brasil" },
          { hour: "6:23", loc: "Farmácia Popular (João XXIII)" },
          { hour: "6:25", loc: "Verdão" },
          { hour: "6:27", loc: "Ao lado do Batalhão da PM" },
          { hour: "6:30", loc: "Posto Raul Lins (Castelo Lins)" },
          { hour: "6:32", loc: "Equipadora Cordeiro (Alto do Cruzeiro)" },
          { hour: "6:35", loc: "Parque Lagoa de Calú" },
          { hour: "6:40", loc: "Canteiro de Obras – Juazeiro" },
          { hour: "7:05", loc: "Ciências Agrárias – CCA" },
        ]
      }, {
        name: "B", via: "Via Av. Honorato Viana"
      }];
  }
}
