export class Geodetic2 {
  private _lon: number;
  private _lat: number;

  public get lon(): number {
    return this._lon;
  }

  public set lon(value: number) {
    this._lon = value;
  }

  public get lat(): number {
    return this._lat;
  }

  public set lat(value: number) {
    this._lat = value;
  }

  constructor(lon: number, lat: number) {
    this._lon = lon;
    this._lat = lat;
  }
}
