import {StopModel} from './models';

export class RouteModel {
  protected    _id: number;
  protected   _bus: string;
  protected   _way: string;
  protected _stops: Array<StopModel>;

  constructor(data: any) {
    this._id     = data.id;
    this._bus    = data.bus;
    this._way    = data.way;
    this._stops  = data.stops.map((v) => {
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
