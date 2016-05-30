import {Page, NavController} from 'ionic-angular';
import {RouteService} from '../../providers/providers';
import {StopModel} from '../../models/models';

@Page({
  templateUrl: 'build/pages/stop/stop.html',
})

export class StopPage {
  private searchQuery: string;
  private stops: Array<StopModel> = undefined;
  private data: Array<StopModel> = undefined;

  constructor(public nav: NavController, public routeData: RouteService) { }

  ngOnInit() {
    this.routeData.stops().then(data => {
      // this.stops = data;
      this.data = data;
    });
  }

  private goToRoutes(stop) {
    // this.nav.push()
  }

  private search(searchBar) {
    // set q to the value of the searchbar
    var q = searchBar.value;

    this.stops = undefined;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.stops = this.data.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }

}
