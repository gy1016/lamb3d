export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(right: Vector3): Vector3 {
    this.x += right.x;
    this.y += right.y;
    this.z += right.z;
    return this;
  }

  setValue(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  cloneTo(out: Vector3): Vector3 {
    out.x = this.x;
    out.y = this.y;
    out.z = this.z;
    return out;
  }

  // copy a vector3
  copyFrom(vec3: Vector3) {
    this.x = vec3.x;
    this.y = vec3.y;
    this.z = vec3.z;
  }

  /**
   * dot multiply
   * @param vec3
   * @returns new Vector
   */
  dot(vec3: Vector3): number {
    return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }

  /**
   * i   j   k
   * x1  y1  z1
   * x2  y2  z2
   */
  cross(vec3: Vector3): Vector3 {
    const x = this.y * vec3.z - this.z * vec3.y;
    const y = this.z * vec3.x - this.x * vec3.z;
    const z = this.x * vec3.y - this.y * vec3.x;

    return new Vector3(x, y, z);
  }

  sub(vec3: Vector3): Vector3 {
    return new Vector3(this.x - vec3.x, this.y - vec3.y, this.z - vec3.z);
  }

  /**
   * Scale this vector by the given value.
   * @param s - The amount by which to scale the vector
   * @returns This vector
   */
  scale(s: number): Vector3 {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const len = this.length();
    this.x = this.x / len;
    this.y = this.y / len;
    this.z = this.z / len;
  }

  /**
   * Determines the difference between two vectors.
   * @param left - The first vector to subtract
   * @param right - The second vector to subtract
   * @param out - The difference between two vectors
   */
  static subtract(left: Vector3, right: Vector3, out: Vector3): void {
    out.x = left.x - right.x;
    out.y = left.y - right.y;
    out.z = left.z - right.z;
  }

  /**
   * Scale a vector by the given value.
   * @param a - The vector to scale
   * @param s - The amount by which to scale the vector
   * @param out - The scaled vector
   */
  static scale(a: Vector3, s: number, out: Vector3): void {
    out.x = a.x * s;
    out.y = a.y * s;
    out.z = a.z * s;
  }

  /**
   * Determines the cross product of two vectors.
   * @param left - The first vector to cross
   * @param right - The second vector to cross
   * @param out - The cross product of two vectors
   */
  static cross(left: Vector3, right: Vector3, out: Vector3): void {
    const ax = left.x;
    const ay = left.y;
    const az = left.z;
    const bx = right.x;
    const by = right.y;
    const bz = right.z;

    out.setValue(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
  }
}
