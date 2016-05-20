import {Page, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/bus-result/bus-result.html'
})

export class BusResult {
    destino : string;
    origem : string;

  constructor(params: NavParams) {
      this.origem = params.data.origem;
      this.destino = params.data.destino;
      console.log(params.data);
  }
}
