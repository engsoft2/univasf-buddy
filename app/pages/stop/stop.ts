import {Alert, Loading, Page, NavController, Searchbar} from 'ionic-angular';
import {RouteService}    from '../../providers/providers';
import {StopModel}       from '../../models/models';
import {StopDetailsPage} from '../pages';

@Page({
  templateUrl: 'build/pages/stop/stop.html',
})

export class StopPage {
  private stops:  Array<StopModel> = undefined;
  private backup: Array<StopModel> = undefined;
  private isSearchbarEnabled = false;

  constructor(public nav: NavController, public routeData: RouteService) {
    console.log('constructor');
  }

  ngOnInit() {
    this.initializeItems();
  }

  initializeItems() {
    this.routeData.stops.then(data => {
      this.backup = data;
    });
  }

  search(searchbar) {
      this.isSearchbarEnabled = true;

      // TODO: find a better way to do this
      // create a directive for example
      setTimeout(() => {
        document.querySelector('#univasf > ion-searchbar > div > input')
                .setAttribute("id", "stop-search");
        document.getElementById('stop-search').focus();
      });
  }

  private goToRoutes(stop) {
    this.nav.push(StopDetailsPage, stop);
  }

  private searchInput(searchBar: Searchbar) {
    // set q to the value of the searchbar
    let q = searchBar.value;

    // clear list of itens
    this.stops = undefined;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') return;

    // save check and filtler
    if (this.backup) {
      this.stops = this.backup.filter((v) => {
        return v.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
      });
    }
  }
}
