export class Vector4 {
  public elements: Float32Array;

  constructor(v?: Vector4) {
    this.elements = new Float32Array(4);
    if (v) {
      this.elements[0] = v[0];
      this.elements[1] = v[1];
      this.elements[2] = v[2];
      this.elements[3] = v[3];
    }
  }
}
