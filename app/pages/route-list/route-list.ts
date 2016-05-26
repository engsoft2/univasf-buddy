import {Page, NavController} from 'ionic-angular';
import {RouteCard} from '../../components/route-card/route-card';
import {RouteService} from '../../providers/route-service/route-service';

/*
  Generated class for the LinesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/route-list/route-list.html',
  directives: [RouteCard],
})
export class RouteListPage {
  searchQuery: string = '';
  routes;
  data;

  constructor(public nav: NavController, public routeData : RouteService) {
    this.initializeItems();
  }

  // ngOnInit() {
  //   console.log('ngOnInit');
  //   this.routeData.getAllLines().then(
  //     data => {
  //       this.routes = data;
  //       console.log(data);
  //     }
  //   )
  // }

  route(name) {
    return name;
  }

  initializeItems() {
    this.routeData.getAllLines().then(
      data => {
        this.routes = data;
        this.data = data;
      }
    );
  }

  search(searchbar) {
    // Reset items back to all of the items
    this.routes = this.data;

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.routes = this.routes.filter((v) => {
      if (v.onibus.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
          v.via.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      return false;
    });
  }
}
