export class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  // copy a vector4
  copyFrom(vec4: Vector4) {
    this.x = vec4.x;
    this.y = vec4.y;
    this.z = vec4.z;
    this.w = vec4.w;
  }

  cloneTo(out: Vector4): Vector4 {
    out.x = this.x;
    out.y = this.y;
    out.z = this.z;
    out.w = this.w;
    return out;
  }
}
