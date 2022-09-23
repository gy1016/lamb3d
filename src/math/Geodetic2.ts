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

  constructor(lon: number = 0, lat: number = 0) {
    this._lon = lon;
    this._lat = lat;
  }

  clone(): Geodetic2 {
    return new Geodetic2(this._lon, this._lat);
  }

  /**
   * Copy from vector2 like object.
   * @param source - Vector2 like object
   * @returns This vector
   */
  copyFrom(source: Geodetic2): Geodetic2 {
    this._lon = source.lon;
    this._lat = source.lat;
    return this;
  }
}
