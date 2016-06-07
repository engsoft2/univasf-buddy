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

  getnewsHeadlines(page) {
    return this.loadNews(page).then(data => {
      return data;
    });
  }

  getNews(id) {
    return this.loadNewsBody(id).then(data => {
      return data;
    });
  }

  // TODO: refactor this code to use the variables
  private loadNewsBody(cod) {
    // Base URI for Web service
    let yql_base_uri = "https://query.yahooapis.com/v1/public/yql?q=";
    let univasf_url = "\"http://univasf.edu.br/detalhe_noticias.php?cod=" + cod + "\"";
    let univasf_xpath = "'/html/body/table/tbody/tr/td/p'";
    let yql_query = "select content from html where url=" + univasf_url + "and xpath =" + univasf_xpath;
    let s = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Funivasf.edu.br%2Fdetalhe_noticias.php%3Fcod%3D"

+
    cod + "'%20and%20xpath%3D'%2Fhtml%2Fbody%2Ftable%2Ftbody%2Ftr%2Ftd%2Fp'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    return new Promise(resolve => {
      // this.http.get(yql_base_uri+encodeURIComponent(yql_query)+'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
      this.http.get(s)
        .map(res => res.json())
        .subscribe(data => {
          let count = data.query.count;
          if (count > 2) {
            console.log('count > 2 ' + count);
            resolve(data.query.results.p[count-2].content);
          }
          resolve(data.query.results.p[0].content);
        });
    })
  }

  /**
   * Load a specific page
   * * @param {number} page=1 page number to be loaded. Default 1
   * @return {array}
   */
  private loadNews(page = 1) {
    // Base URI for Web service
    let yql_base_uri = "https://query.yahooapis.com/v1/public/yql?q=";

    let univasf_url = "'http://univasf.edu.br/todas.php?pa=" + page + "'";
    let univasf_xpath = "'//*[@id=\"formNoticia\"]/table[2]/tbody/tr/td/font/span'"

    // Create a YQL query to get the data
    let yql_query =   "select onclick, b, content from html where url="+
                          univasf_url + " and xpath=" + univasf_xpath;

    return new Promise(resolve => {
      this.http.get(yql_base_uri+encodeURIComponent(yql_query)+'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.query.results.span);
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
