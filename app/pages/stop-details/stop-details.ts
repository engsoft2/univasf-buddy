import {Component} from '@angular/core';
import {Alert, Loading, NavController, NavParams} from 'ionic-angular';
import {RouteCard}    from '../../components/components';
import {RouteService} from '../../providers/providers';
import {StopModel}    from '../../models/models';

@Component({
  templateUrl: 'build/pages/stop-details/stop-details.html',
  directives: [RouteCard],
})

export class StopDetailsPage {
    stop: any;
  routes: any;

  constructor(public nav: NavController, params: NavParams, public service: RouteService) {
    this.stop = params.data;
  }

  ngOnInit() {
    let loading = Loading.create({
      content: 'Please wait...'
    });

    this.presentLoadingDefault(loading);
    this.service.getRoutesById(this.stop.id).then(
      data => {
        this.routes = data;
        loading.dismiss();
      }
    )
  }

  presentLoadingDefault(loading) {

    this.nav.present(loading);

    setTimeout(() => {
      if (!this.routes) {
        console.log('not ok')
        this.presentAlert();
      }

      loading.dismiss();
    }, 5000);
  }

  presentAlert() {
    let alert = Alert.create({
      title: 'Ocorreu uma falha ao carregar os dados',
      subTitle: 'Por favor verifique sua conexao com a Internet',
      buttons: ['Fechar']
    });
    this.nav.present(alert);
  }

}
