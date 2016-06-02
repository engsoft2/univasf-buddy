import {Alert, Loading, Page, NavController} from 'ionic-angular';
import {RouteService} from '../../providers/providers';
import {StopModel} from '../../models/models';
import {StopDetailsPage} from '../pages';

@Page({
  templateUrl: 'build/pages/stop/stop.html',
})

export class StopPage {
  private searchQuery: string;
  private stops: Array<StopModel> = undefined;
  private data:  Array<StopModel> = undefined;

  constructor(public nav: NavController, public routeData: RouteService) { }

  ngOnInit() {
    let loading = Loading.create({
      content: 'Please wait...'
    });

    this.presentLoadingDefault(loading);
    this.routeData.stops.then(data => {
      this.data = data;
      loading.dismiss();
    });
  }

  private goToRoutes(stop) {
    this.nav.push(StopDetailsPage, stop);
  }

  private search(searchBar) {
    // set q to the value of the searchbar
    var q = searchBar.value;

    this.stops = undefined;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    // save check
    if (this.data) {
      this.stops = this.data.filter((v) => {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      });
    }
  }

  // TODO: think in a better approach to
  // the loading component in all pages
  presentLoadingDefault(loading) {
    this.nav.present(loading);

    setTimeout(() => {
      if (!this.data) {
        console.log('not ok');
        this.presentAlert();
      }

      loading.dismiss();
    }, 10000);
  }

  // TODO: present a Toast
  // https://www.google.com/design/spec/patterns/errors.html#errors-app-errors
  presentAlert() {
    let alert = Alert.create({
      title: 'Ocorreu uma falha ao carregar os dados',
      subTitle: 'Por favor verifique sua conexao com a Internet',
      buttons: ['Fechar']
    });
    this.nav.present(alert);
  }
}
