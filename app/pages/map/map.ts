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
      fullscreenControl: false,
      zoom: 14
    });

    // prevent google maps of showing gray area when starts from another page
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
      this.map.setCenter({ lat: -9.42044, lng: -40.50367 });
    }
    , 200);

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
        // wait just a little bit to user see name of stop on the map
        setTimeout(() => this.goToRoutes(ev.row.id.value), 500);
    })
  }

  private goToRoutes(id) {
    this.nav.push(RouteListPage, parseInt(id));
  }
}
