import {Component} from '@angular/core';
import {NavController, Searchbar} from 'ionic-angular';
import {RouteService}    from '../../providers/providers';
import {StopModel}       from '../../models/models';
import {RouteListPage} from '../pages';

@Component({
  templateUrl: 'build/pages/stop/stop.html',
})

export class StopPage {
  private stops: Array<StopModel> = undefined;
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
    this.nav.push(RouteListPage, stop.id);
  }

  private onCancel(ev) {
      this.isSearchbarEnabled = false;
  }

  private searchInput(ev) {
    // set q to the value of the searchbar
    let q = ev.target.value;
    // if the value is an empty string don't filter the items
    if (q && q.trim() == '') return;

    // clear list of itens
    this.stops = undefined;

    // save check and filtler
    if (q && this.backup) {
      this.stops = this.backup.filter((v) => {
        return v.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
      });
    }
  }
}
