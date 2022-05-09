import { Vector3, Matrix4, Quaternion, MathUtil } from '../math';

export class Transform {
  private static _tempVec30: Vector3 = new Vector3();
  private static _tempVec31: Vector3 = new Vector3();
  private static _tempVec32: Vector3 = new Vector3();

  private _position: Vector3 = new Vector3();
  private _rotation: Vector3 = new Vector3();
  private _rotationQuaternion: Quaternion = new Quaternion();
  private _scale: Vector3 = new Vector3(1, 1, 1);
  private _localMatrix: Matrix4 = new Matrix4();

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    if (this._position !== value) {
      value.cloneTo(this._position);
    }
  }

  get rotation(): Vector3 {
    return this._rotation;
  }

  set rotation(value: Vector3) {
    if (this._rotation !== value) {
      value.cloneTo(this._rotation);
    }
  }

  get scale(): Vector3 {
    return this._scale;
  }

  set scale(value: Vector3) {
    if (this._scale !== value) {
      value.cloneTo(this._scale);
    }
  }

  get rotationQuaternion(): Quaternion {
    const rotationQuaternion = this._rotationQuaternion;
    rotationQuaternion._onValueChanged = null;
    Quaternion.rotationEuler(
      MathUtil.degreeToRadian(this._rotation.x),
      MathUtil.degreeToRadian(this._rotation.y),
      MathUtil.degreeToRadian(this._rotation.z),
      rotationQuaternion,
    );
    return rotationQuaternion;
  }

  get localMatrix(): Matrix4 {
    Matrix4.affineTransformation(this._scale, this.rotationQuaternion, this._position, this._localMatrix);
    return this._localMatrix;
  }

  setPosition(x: number, y: number, z: number): void {
    this._position.setValue(x, y, z);
  }

  setRotation(x: number, y: number, z: number): void {
    this._rotation.setValue(x, y, z);
  }

  setScale(x: number, y: number, z: number): void {
    this._scale.setValue(x, y, z);
  }

  // 这里我直接加不行么，搞这么复杂
  // 因为后续可能要引入世界坐标系
  // 并且该方法可能要支持重载
  translate(x: number, y: number, z: number) {
    const translate = Transform._tempVec30;
    translate.setValue(x, y, z);
    this._position.add(translate);
  }

  rotate(x: number, y: number, z: number): void {
    const rotate = Transform._tempVec31;
    rotate.setValue(x, y, z);
    this._rotation.add(rotate);
  }
}
