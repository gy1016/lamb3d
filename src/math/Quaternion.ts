export class Quaternion {
  _x: number;
  _y: number;
  _z: number;
  _w: number;
  _onValueChanged: () => void = null;

  public get x(): number {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
    this._onValueChanged && this._onValueChanged();
  }

  /**
   * The y component of the quaternion.
   */
  public get y(): number {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
    this._onValueChanged && this._onValueChanged();
  }

  /**
   * The z component of the quaternion.
   */
  public get z(): number {
    return this._z;
  }

  public set z(value: number) {
    this._z = value;
    this._onValueChanged && this._onValueChanged();
  }

  /**
   * The w component of the quaternion.
   */
  public get w() {
    return this._w;
  }

  public set w(value: number) {
    this._w = value;
    this._onValueChanged && this._onValueChanged();
  }

  /**
   * Constructor of Quaternion.
   * @param x - The x component of the quaternion, default 0
   * @param y - The y component of the quaternion, default 0
   * @param z - The z component of the quaternion, default 0
   * @param w - The w component of the quaternion, default 1
   */
  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }

  /**
   * Calculate a quaternion rotates around x, y, z axis (pitch/yaw/roll).
   * @param x - The radian of rotation around X (pitch)
   * @param y - The radian of rotation around Y (yaw)
   * @param z - The radian of rotation around Z (roll)
   * @param out - The calculated quaternion
   */
  static rotationEuler(x: number, y: number, z: number, out: Quaternion): void {
    Quaternion.rotationYawPitchRoll(y, x, z, out);
  }

  /**
   * Calculate a quaternion from the specified yaw, pitch and roll angles.
   * @param yaw - Yaw around the y axis in radians
   * @param pitch - Pitch around the x axis in radians
   * @param roll - Roll around the z axis in radians
   * @param out - The calculated quaternion
   */
  static rotationYawPitchRoll(yaw: number, pitch: number, roll: number, out: Quaternion): void {
    const halfRoll = roll * 0.5;
    const halfPitch = pitch * 0.5;
    const halfYaw = yaw * 0.5;

    const sinRoll = Math.sin(halfRoll);
    const cosRoll = Math.cos(halfRoll);
    const sinPitch = Math.sin(halfPitch);
    const cosPitch = Math.cos(halfPitch);
    const sinYaw = Math.sin(halfYaw);
    const cosYaw = Math.cos(halfYaw);

    const cosYawPitch = cosYaw * cosPitch;
    const sinYawPitch = sinYaw * sinPitch;

    out._x = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
    out._y = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
    out._z = cosYawPitch * sinRoll - sinYawPitch * cosRoll;
    out._w = cosYawPitch * cosRoll + sinYawPitch * sinRoll;
    out._onValueChanged && out._onValueChanged();
  }
}
