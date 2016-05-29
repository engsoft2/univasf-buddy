import {Page, NavController} from 'ionic-angular';
import {RouteCard}    from '../../components/components';
import {RouteModel}   from '../../models/models';
import {RouteService} from '../../providers/providers';

@Page({
  templateUrl: 'build/pages/route-list/route-list.html',
  directives: [RouteCard],
})

export class RouteListPage {
  private searchQuery: string = '';
  private routes: Array<RouteModel>;
  private data:   Array<RouteModel>;

  constructor(public nav: NavController, public routeData: RouteService) {
    this.initializeItems();
  }

  private initializeItems() {
    this.routeData.getAllLines().then(
      data => {
        this.routes = data;
        this.data = data;
      }
    );
  }

  // TODO: redo search method
  private search(searchbar) {
    // Reset items back to all of the items
    this.routes = this.data;

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.routes = this.routes.filter((v) => {
      if (v.bus.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        v.way.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }
}
