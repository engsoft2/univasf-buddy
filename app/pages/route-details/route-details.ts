import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {TimeAgoPipe, DateFormatPipe}    from 'angular2-moment';
import {StopModel, RouteModel}          from '../../models/models';

@Component({
  templateUrl: 'build/pages/route-details/route-details.html',
  pipes: [TimeAgoPipe, DateFormatPipe]
})

export class RouteDetailsPage {
  private route: RouteModel;
  private map: any;
  private marker: any;

  constructor(params: NavParams) {
    this.route = params.data;
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    let mapEle = document.getElementById('map');

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
  }

  showMarkerAndZoom(stop) {
    // save check
    if (stop && stop.lat) {
      let latLng = { lat: parseFloat(stop.lat), lng: parseFloat(stop.lng) };

      this.map.panTo(latLng);
      this.map.setZoom(14);

      // clear marker - just to show one marker at a time
      if (this.marker) {
        this.marker.setMap(null);
      }

      // create marker
      this.marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.BOUNCE,
        map: this.map,
      });
    }
  }
}
