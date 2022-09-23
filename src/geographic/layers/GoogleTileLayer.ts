export class GoogleTileLayer {
  private mtIdx: number = 0;

  constructor() {}

  getTileUrl(level: number, row: number, column: number): string {
    // http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x=420&y=193&z=9&s=Galil
    return `www.gaoyangshihundan.com`;
  }
}
