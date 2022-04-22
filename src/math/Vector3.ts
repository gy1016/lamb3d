export class Vector3 {
  x: number;
  y: number;
  z: number;

<<<<<<< HEAD
  constructor(x: number, y: number, z: number) {
=======
  constructor(x: number = 0, y: number = 0, z: number = 0) {
>>>>>>> 7c3f1a1f7eb865bd9c2b521842956ff66d39dcec
    this.x = x;
    this.y = y;
    this.z = z;
  }
<<<<<<< HEAD

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
    let x = this.y * vec3.z - this.z * vec3.y;
    let y = this.z * vec3.x - this.x * vec3.z;
    let z = this.x * vec3.y - this.y * vec3.x;

    return new Vector3(x, y, z);
  }

  sub(vec3: Vector3): Vector3 {
    return new Vector3(this.x - vec3.x, this.y - vec3.y, this.z - vec3.z);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const len = this.length;
    this.x = this.x / len;
    this.y = this.y / len;
    this.z = this.z / len;
  }
=======
>>>>>>> 7c3f1a1f7eb865bd9c2b521842956ff66d39dcec
}
