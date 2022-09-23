import { Geodetic2 } from '@/math/Geodetic2';
import { MathUtil } from '@/math/MathUtil';

export class TileInfo {
  private minLongitude: number;
  private maxLongitude: number;
  private minLatitude: number;
  private maxLatitude: number;

  private minMercatorX: number;
  private maxMercatorX: number;
  private minMercatorY: number;
  private maxMercatorY: number;

  public readonly level: number;
  public readonly row: number;
  public readonly column: number;

  /**
   * Tile information constructor.
   * @param level The level to which the tile belongs.
   * @param row Tile row number.
   * @param column Tile column number.
   */
  constructor(level: number, row: number, column: number) {
    this.level = level;
    this.row = row;
    this.column = column;

    this.setTileInfo();
  }

  /**
   * 根据瓦片级别、行号和列号，初始化瓦片信息。
   */
  private setTileInfo() {
    const geodeticRect = MathUtil.gridToGeodeticRect(this.level, this.row, this.column);
    this.minLongitude = geodeticRect.min.lon;
    this.minLatitude = geodeticRect.min.lat;
    this.maxLongitude = geodeticRect.max.lon;
    this.maxLatitude = geodeticRect.max.lat;

    const minMercator = MathUtil.geodeticToWebMercator(new Geodetic2(this.minLongitude, this.minLatitude));
    const maxMercator = MathUtil.geodeticToWebMercator(new Geodetic2(this.maxLongitude, this.maxLatitude));

    this.minMercatorX = minMercator.x;
    this.minMercatorY = minMercator.y;
    this.maxMercatorX = maxMercator.x;
    this.maxMercatorY = maxMercator.y;

    console.log(this);
  }
}
