import {StopModel} from './Stop';

export class RouteModel {
  protected    _id: number;
  protected   _bus: string;
  protected   _way: string;
  protected _stops: Array<StopModel>;

  constructor(data: any) {
    console.log('stopmodel');
    this._id     = data.rota;
    this._bus    = data.onibus;
    this._way    = data.via;
    this._stops  = data.paradas.map((v) => {
      return new StopModel(v);
    });
  }

  get bus() {
    return this._bus;
  }

  get way() {
    return this._way;
  }

  get stops() {
    return this._stops;
  }

  /**
   * Returns the first element from the array of stops
   * * @return {StopModel} stop - the first element
   */
  get first(): StopModel {
    return this._stops[0];
  }

  /**
   * Returns the last element from the array of stops
   * @return {StopModel} stop - the last element
   */
  get last(): StopModel {
    return this._stops[this._stops.length - 1];
  }

}
