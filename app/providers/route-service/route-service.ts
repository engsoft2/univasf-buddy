import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {RouteModel, StopModel} from '../../models/models';

@Injectable()
export class RouteService {
  private _routes: Array<RouteModel> = undefined;
  private _stops: Array<StopModel> = undefined;

  constructor(public http: Http) { }

  get routes() {
    return this.loadRoutes().then(data => {
      return data;
    });
  }

  get stops() {
    return this.loadStops().then(data => {
      return data;
    })
  }

  get newsHeadlines() {
    return this.loadNews().then(data => {
      return data;
    });
  }

  getNews(id) {
    return this.loadNews(id).then(data => {
      return data;
    });
  }

  private loadNews(newsId?: number) {
    // Base URI for Web service
    let yql_base_uri = "https://query.yahooapis.com/v1/public/yql?q=";

    let univasf_url = "'http://univasf.edu.br/todas.php'"
    let univasf_xpath = "'//*[@id=\"formNoticia\"]/table[2]/tbody/tr/td/font/span'"

    // if a news id is passed the request changes
    if (newsId) {
      univasf_url = "'http://univasf.edu.br/detalhe_noticias.php?cod=" + newsId + "'";
      univasf_xpath = "'/html/body/table/tbody/tr/td/p'";
    }

    // Create a YQL query to get the data
    let yql_query =   "select onclick, b, content from html where url="+
                          univasf_url + " and xpath=" + univasf_xpath;

    return new Promise(resolve => {
      this.http.get(yql_base_uri+encodeURIComponent(yql_query)+'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  getRoutesById(id) {
    let routes: Array<RouteModel> = undefined;

    return new Promise(resolve => {
      // this.http.get('http://localhost:8000/rotasAPI/' + id)
      this.http.get('http://162.243.88.81/rotasAPI/' + id)
        .map(res => res.json())
        .subscribe(data => {
          routes = data.map((v) => { return new RouteModel(v); });
          resolve(routes);
        })
    });
  }

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
}
