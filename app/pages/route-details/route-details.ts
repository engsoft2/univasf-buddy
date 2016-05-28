import {App, Platform, Page, NavParams} from 'ionic-angular';
import {TimeAgoPipe, DateFormatPipe} from 'angular2-moment';
import {RouteModel} from '../../models/models';

@Page({
  templateUrl: 'build/pages/route-details/route-details.html',
  pipes: [TimeAgoPipe, DateFormatPipe]
})

export class RouteDetailsPage {
  route: RouteModel;
  map: any;
  ctaLayer: any;
  constructor(platform: Platform, params: NavParams) {
    this.route = params.data;
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

    this.ctaLayer = new google.maps.KmlLayer({
      url: 'https://firebasestorage.googleapis.com/v0/b/univasf-buddy.appspot.com/o/busA_1%20(1).kmz?alt=media&token=003931a9-7556-4c2c-a010-09cabf9fe821',
      preserveViewport: true,
      map: this.map
    });

    //  console.log(ctaLayer.getMetadata());

    // ctaLayer = new google.maps.KmlLayer({
    //    url: 'https://firebasestorage.googleapis.com/v0/b/univasf-buddy.appspot.com/o/arrow.kmz?alt=media&token=a5ab07be-d9a2-4a63-b629-bbfd322f0de9',
    //    map: map
    //  });


  }

  zoom(stop) {
    this.map.panTo({ lat: -9.43064, lng: -40.50353 });
    this.map.setZoom(16);
    console.log(this.ctaLayer.getMetadata());


  }

}
