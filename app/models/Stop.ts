export class StopModel {
  protected   _id: number;
  protected _name: string;
  protected _time: number;
  protected  _lat: number;
  protected  _lng: number;

  constructor(data: any) {
    this._id   = data.id;
    this._name = data.name;
    this._time = this.toDate(data.time);
    this._lat  = data.lat;
    this._lng  = data.lng;
  }

  get name() {
    return this._name;
  }

  get time() {
    return this._time;
  }

  get lat() {
    return this._lat;
  }

  get lng() {
    return this._lng;
  }

  /**
   * It converts a string with Hour and Minutes to a valide date
   * @param  {string} date - e.g. 10:00
   * @return {number} Date - a new Date with Hour and Minutes from @param
   * */
  private toDate(date): number {
    if (!date) {
      return undefined;
    }

    return new Date().setHours(
        Number(date.slice(0, 2)),
        Number(date.slice(3, 5)), 0, 0);
  }

}
