import {App, Platform, Page, NavParams} from 'ionic-angular';
import {TimeAgoPipe, DateFormatPipe}    from 'angular2-moment';
import {StopModel, RouteModel}          from '../../models/models';

@Page({
  templateUrl: 'build/pages/route-details/route-details.html',
  pipes: [TimeAgoPipe, DateFormatPipe]
})

export class RouteDetailsPage {
  private        route: RouteModel;
  private          map: any;
  private     ctaLayer: any;
  private   infowindow: any;

  // Each marker is labeled with a single alphabetical character.
  private     labels: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  private labelIndex: number = 0;

  constructor(platform: Platform, params: NavParams) {
    this.route = params.data;
    console.log(this.route);
    platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    let mapEle = document.getElementById('map');

    this.map = new google.maps.Map(mapEle, {
      center: { lat: -9.42044, lng: -40.50367 },
      zoom: 13
    });

    this.infowindow = new google.maps.InfoWindow({
      content: ''
    });

    this.route.stops.forEach(v => {
      this.addMarker(v, this.infowindow);
    });
  }

  // Adds a marker to the map.
  addMarker(stop, infowindow) {

    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    let marker = new google.maps.Marker({
      position: { lat: Number(stop.lat), lng: Number(stop.lng) },
      label: this.labels[this.labelIndex++ % this.labels.length],
      map: this.map
    });

    marker.addListener('click', () => {
      this.openInfoWindow(stop.name, marker);
   });
  }

  zoom(stop) {
    // save check
    if (stop && stop.lat) {
        let latLng = { lat: parseFloat(stop.lat), lng: parseFloat(stop.lng)};
        this.map.panTo(latLng);
        this.map.setZoom(16);

        // create 'empty' marker to open infowindow
        let marker = new google.maps.Marker({
          position: latLng,
          map: this.map
        });

        this.openInfoWindow(stop.name, marker);
    }
  }

  openInfoWindow(content, marker) {
    this.infowindow.setContent('<h6>' + content + '</h6>');
    this.infowindow.open(this.map, marker);
  }
}
