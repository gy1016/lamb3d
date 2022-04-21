export class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x: number, y: number, z: number, w: number) {
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
}
