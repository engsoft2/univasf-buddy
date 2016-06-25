import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RouteListPage} from '../pages';

@Component({
  templateUrl: 'build/pages/map/map.html',
})

export class MapPage {
  private map: any;

  constructor(public nav: NavController) { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    console.log('initMap');
    let mapEle = document.getElementById('map-tab');

    this.map = new google.maps.Map(mapEle, {
      center: { lat: -9.42044, lng: -40.50367 },
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
      zoom: 14
    });

    let layer = new google.maps.FusionTablesLayer({
      query: {
        select: "col2",
        from: "1LBauH-AOJ15r1uAEmnctJYhfQfpNJtdBcJFftuak",
        where: ""
      },
      options: {
        styleId: 2,
        templateId: 2
      }
    });

    layer.setMap(this.map);

    layer.addListener('click', (ev) => {
        console.log('go to routes');
        this.goToRoutes(ev.row.id.value);
    })
  }

  private goToRoutes(id) {
    this.nav.push(RouteListPage, parseInt(id));
  }
}
