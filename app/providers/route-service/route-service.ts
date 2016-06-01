import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {RouteModel, StopModel} from '../../models/models';

@Injectable()
export class RouteService {
  private _routes: Array<RouteModel> = undefined;
  private _stops: Array<StopModel> = undefined;

  constructor(public http: Http) { }

  private loadRoutes() {
    if (this._routes) {
      // already loaded data
      return Promise.resolve(this._routes);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      // this.http.get('http://localhost:8000/rotas')
      this.http.get('http://162.243.88.81/rotas')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this._routes = data.map((v) => {
            return new RouteModel(v);
          });

          resolve(this._routes);
        });
    });
  }

  get routes() {
    return this.loadRoutes().then(data => {
      return data;
    });
  }

  private loadStops() {
    if (this._stops) {
      return Promise.resolve(this._stops);
    }

    return new Promise(resolve => {
      // this.http.get('http://localhost:8000/paradas')
      this.http.get('http://162.243.88.81/paradas')
        .map(res => res.json())
        .subscribe(data => {
          this._stops = data.map(v => {
            return new StopModel(v);
          });

          resolve(this._stops);
        });
    });
  }

  get stops() {
    return this.loadStops().then(data => {
      return data;
    })
  }

  getRoutesById(id) {
    let stops: Array<StopModel> = undefined;
    return new Promise(resolve => {
      // this.http.get('http://localhost:8000/rotasAPI/' + id)
      this.http.get('http://162.243.88.81/rotasAPI/' + id)
        .map(res => res.json())
        .subscribe(data => {
          stops = data.map((v) => { return new RouteModel(v); });
          resolve(stops);
        })
    });
  }
}
