export class StopModel {
  protected   _id: number;
  protected _name: string;
  protected _time: number;
  protected  _lat: number;
  protected  _lng: number;

  constructor(data: any) {
    this._id   = data.ponto_id;
    this._name = data.nome_parada;
    this._time = this.toDate(data.horario);
  }

  get name() {
    return this._name;
  }

  get time() {
    return this._time;
  }

  get lat() {
    return this.lat;
  }

  get lng() {
    return this.lng;
  }

  /**
   * It converts a string with Hour and Minutes to a valide date
   * @param  {string} date - e.g. 10:00
   * @return {number} Date - a new Date with Hour and Minutes from @param
   * */
  private toDate(date): number {
    return new Date().setHours(
        Number(date.slice(0, 2)),
        Number(date.slice(3, 5)), 0, 0);
  }

}
