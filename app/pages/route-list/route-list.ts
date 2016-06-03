import {Loading, Page, NavController} from 'ionic-angular';
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
  private   data: Array<RouteModel>;
  private filter: Array<string>;
  private buses = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  constructor(public nav: NavController, public routeData: RouteService) {
    // this.initializeItems();
    this.presentLoadingDefault()
  }

  private filterBus() {
    // Reset items back to all of the items
    this.routes = this.data;

    let q = this.filter;
    // save check
    if (this.routes) {
      this.routes = this.routes.filter((v) => {
        // little hack b/c there is one case where v.bus = C/D
        if (v.bus.length > 1) {
          return q.indexOf(v.bus[0]) > -1 || q.indexOf(v.bus[2]) > -1;
        }
        return q.indexOf(v.bus) > -1;
      });
    }
  }

  // TODO: mv to ngOnInit()
  private initializeItems(load) {
    this.routeData.routes.then(
      data => {
        this.routes = data;
        this.data = data;
        load.dismiss();
      }
    );
  }

  private presentLoadingDefault() {
    let loading = Loading.create({
      content: 'Please wait...'
    });

    this.nav.present(loading);

    this.initializeItems(loading);

    setTimeout(() => {
      if (!this.data) {
        // TODO: present info to user
        // TODO: connection slow, etc..
        console.log('not ok');
      }

      console.log('dismiss loading');
      loading.dismiss();
    }, 5000);
  }
}
