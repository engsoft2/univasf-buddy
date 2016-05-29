import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/stop/stop.html',
})

export class StopPage {
  private searchQuery: string;

  constructor(public nav: NavController) { }

  private search(searchBar) {
    // set q to the value of the searchbar
    var q = searchBar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }
  }
}
