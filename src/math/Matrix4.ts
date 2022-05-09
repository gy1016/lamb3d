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
}
