import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
export class Matrix4 {
  /**
   * An array containing the elements of the matrix (column matrix).
   * @remarks
   * elements[0] first column and first row value m11
   * elements[1] first column and second row value m12
   * elements[2] first column and third row value m13
   * elements[3] first column and fourth row value m14
   * elements[4] second column and first row value m21
   * and so on
   */
  elements: Float32Array = new Float32Array(16);

  /**
   * Constructor of 4x4 Matrix.
   * @param m11 - default 1, column 1, row 1
   * @param m12 - default 0, column 1, row 2
   * @param m13 - default 0, column 1, row 3
   * @param m14 - default 0, column 1, row 4
   * @param m21 - default 0, column 2, row 1
   * @param m22 - default 1, column 2, row 2
   * @param m23 - default 0, column 2, row 3
   * @param m24 - default 0, column 2, row 4
   * @param m31 - default 0, column 3, row 1
   * @param m32 - default 0, column 3, row 2
   * @param m33 - default 1, column 3, row 3
   * @param m34 - default 0, column 3, row 4
   * @param m41 - default 0, column 4, row 1
   * @param m42 - default 0, column 4, row 2
   * @param m43 - default 0, column 4, row 3
   * @param m44 - default 1, column 4, row 4
   */
  constructor(
    m11: number = 1,
    m12: number = 0,
    m13: number = 0,
    m14: number = 0,
    m21: number = 0,
    m22: number = 1,
    m23: number = 0,
    m24: number = 0,
    m31: number = 0,
    m32: number = 0,
    m33: number = 1,
    m34: number = 0,
    m41: number = 0,
    m42: number = 0,
    m43: number = 0,
    m44: number = 1,
  ) {
    const e: Float32Array = this.elements;

    e[0] = m11;
    e[1] = m12;
    e[2] = m13;
    e[3] = m14;

    e[4] = m21;
    e[5] = m22;
    e[6] = m23;
    e[7] = m24;

    e[8] = m31;
    e[9] = m32;
    e[10] = m33;
    e[11] = m34;

    e[12] = m41;
    e[13] = m42;
    e[14] = m43;
    e[15] = m44;
  }

  /**
   * Calculate an affine matrix.
   * @param scale - The scale used to calculate matrix
   * @param rotation - The rotation used to calculate matrix
   * @param translation - The translation used to calculate matrix
   * @param out - The calculated matrix
   */
  static affineTransformation(scale: Vector3, rotation: Quaternion, translation: Vector3, out: Matrix4): void {
    const oe = out.elements;
    const { _x: x, _y: y, _z: z, _w: w } = rotation;
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    let sx = scale.x;
    let sy = scale.y;
    let sz = scale.z;

    oe[0] = (1 - (yy + zz)) * sx;
    oe[1] = (xy + wz) * sx;
    oe[2] = (xz - wy) * sx;
    oe[3] = 0;

    oe[4] = (xy - wz) * sy;
    oe[5] = (1 - (xx + zz)) * sy;
    oe[6] = (yz + wx) * sy;
    oe[7] = 0;

    oe[8] = (xz + wy) * sz;
    oe[9] = (yz - wx) * sz;
    oe[10] = (1 - (xx + yy)) * sz;
    oe[11] = 0;

    oe[12] = translation.x;
    oe[13] = translation.y;
    oe[14] = translation.z;
    oe[15] = 1;
  }

  /**
   * Calculate the inverse of the specified matrix.
   * @param a - The matrix whose inverse is to be calculated
   * @param out - The inverse of the specified matrix
   */
  static invert(a: Matrix4, out: Matrix4): void {
    const ae = a.elements;
    const oe = out.elements;

    const a11 = ae[0],
      a12 = ae[1],
      a13 = ae[2],
      a14 = ae[3];
    const a21 = ae[4],
      a22 = ae[5],
      a23 = ae[6],
      a24 = ae[7];
    const a31 = ae[8],
      a32 = ae[9],
      a33 = ae[10],
      a34 = ae[11];
    const a41 = ae[12],
      a42 = ae[13],
      a43 = ae[14],
      a44 = ae[15];

    const b00 = a11 * a22 - a12 * a21;
    const b01 = a11 * a23 - a13 * a21;
    const b02 = a11 * a24 - a14 * a21;
    const b03 = a12 * a23 - a13 * a22;
    const b04 = a12 * a24 - a14 * a22;
    const b05 = a13 * a24 - a14 * a23;
    const b06 = a31 * a42 - a32 * a41;
    const b07 = a31 * a43 - a33 * a41;
    const b08 = a31 * a44 - a34 * a41;
    const b09 = a32 * a43 - a33 * a42;
    const b10 = a32 * a44 - a34 * a42;
    const b11 = a33 * a44 - a34 * a43;

    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1.0 / det;

    oe[0] = (a22 * b11 - a23 * b10 + a24 * b09) * det;
    oe[1] = (a13 * b10 - a12 * b11 - a14 * b09) * det;
    oe[2] = (a42 * b05 - a43 * b04 + a44 * b03) * det;
    oe[3] = (a33 * b04 - a32 * b05 - a34 * b03) * det;

    oe[4] = (a23 * b08 - a21 * b11 - a24 * b07) * det;
    oe[5] = (a11 * b11 - a13 * b08 + a14 * b07) * det;
    oe[6] = (a43 * b02 - a41 * b05 - a44 * b01) * det;
    oe[7] = (a31 * b05 - a33 * b02 + a34 * b01) * det;

    oe[8] = (a21 * b10 - a22 * b08 + a24 * b06) * det;
    oe[9] = (a12 * b08 - a11 * b10 - a14 * b06) * det;
    oe[10] = (a41 * b04 - a42 * b02 + a44 * b00) * det;
    oe[11] = (a32 * b02 - a31 * b04 - a34 * b00) * det;

    oe[12] = (a22 * b07 - a21 * b09 - a23 * b06) * det;
    oe[13] = (a11 * b09 - a12 * b07 + a13 * b06) * det;
    oe[14] = (a42 * b01 - a41 * b03 - a43 * b00) * det;
    oe[15] = (a31 * b03 - a32 * b01 + a33 * b00) * det;
  }

  /**
   * Calculate a perspective projection matrix.
   * @param fovY - Field of view in the y direction, in radians
   * @param aspect - Aspect ratio, defined as view space width divided by height
   * @param near - The depth of the near plane
   * @param far - The depth of the far plane
   * @param out - The calculated perspective projection matrix
   */
  static perspective(fovY: number, aspect: number, near: number, far: number, out: Matrix4): void {
    const oe = out.elements;
    const f = 1.0 / Math.tan(fovY / 2);
    const nf = 1 / (near - far);

    oe[0] = f / aspect;
    oe[1] = 0;
    oe[2] = 0;
    oe[3] = 0;

    oe[4] = 0;
    oe[5] = f;
    oe[6] = 0;
    oe[7] = 0;

    oe[8] = 0;
    oe[9] = 0;
    oe[10] = (far + near) * nf;
    oe[11] = -1;

    oe[12] = 0;
    oe[13] = 0;
    oe[14] = 2 * far * near * nf;
    oe[15] = 0;
  }

  /**
   * Calculate an orthographic projection matrix.
   * @param left - The left edge of the viewing
   * @param right - The right edge of the viewing
   * @param bottom - The bottom edge of the viewing
   * @param top - The top edge of the viewing
   * @param near - The depth of the near plane
   * @param far - The depth of the far plane
   * @param out - The calculated orthographic projection matrix
   */
  static ortho(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number,
    out: Matrix4,
  ): void {
    const oe = out.elements;
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);

    oe[0] = -2 * lr;
    oe[1] = 0;
    oe[2] = 0;
    oe[3] = 0;

    oe[4] = 0;
    oe[5] = -2 * bt;
    oe[6] = 0;
    oe[7] = 0;

    oe[8] = 0;
    oe[9] = 0;
    oe[10] = 2 * nf;
    oe[11] = 0;

    oe[12] = (left + right) * lr;
    oe[13] = (top + bottom) * bt;
    oe[14] = (far + near) * nf;
    oe[15] = 1;
  }

  /**
   * Invert the matrix.
   * @returns The matrix after invert
   */
  invert(): Matrix4 {
    Matrix4.invert(this, this);
    return this;
  }
}
