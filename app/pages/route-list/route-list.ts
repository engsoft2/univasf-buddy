import {Page, NavController} from 'ionic-angular';
import {RouteCard} from '../../components/route-card/route-card';

/*
  Generated class for the LinesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/route-list/route-list.html',
  directives: [RouteCard]
})
export class RouteListPage {
  searchQuery: string = '';
  routes;

  constructor(public nav: NavController) {
    this.initializeItems();
  }

  initializeItems() {
    this.routes= [{
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

  search(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.routes = this.routes.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
          v.via.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      return false;
    })
  }
}
