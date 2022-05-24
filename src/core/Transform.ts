import { Vector3, Matrix4, Quaternion, MathUtil } from '../math';

export class Transform {
  private static _tempVec30: Vector3 = new Vector3();
  private static _tempVec31: Vector3 = new Vector3();
  private static _tempVec32: Vector3 = new Vector3();
  private static _tempMat41: Matrix4 = new Matrix4();

  // 位置矢量
  private _position: Vector3 = new Vector3();
  // 旋转矢量
  private _rotation: Vector3 = new Vector3();
  // 旋转四元数矢量
  private _rotationQuaternion: Quaternion = new Quaternion();
  // 缩放矢量
  private _scale: Vector3 = new Vector3(1, 1, 1);

  // 世界位置矢量
  private _worldPosition: Vector3 = new Vector3();
  // 世界旋转矢量
  private _worldRotation: Vector3 = new Vector3();
  // 世界旋转四元数
  private _worldRotationQuaternion: Quaternion = new Quaternion();
  // 世界缩放矢量
  private _lossyWorldScale: Vector3 = new Vector3(1, 1, 1);

  // 本地矩阵
  private _localMatrix: Matrix4 = new Matrix4();
  // 世界矩阵
  private _worldMatrix: Matrix4 = new Matrix4();

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    if (this._position !== value) {
      value.cloneTo(this._position);
    }
  }

  // 世界位置，这里暂时未考虑父子孙Entity的嵌套关系
  // TODO
  get worldPosition(): Vector3 {
    const worldPosition = this._worldPosition;
    this._position.cloneTo(worldPosition);
    return worldPosition;
  }

  set worldPosition(value: Vector3) {
    if (this._worldPosition !== value) {
      value.cloneTo(this._worldPosition);
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

  // 四元数这块都有问题
  get worldRotation(): Vector3 {
    const worldRotation = this._worldRotation;

    return worldRotation;
  }

  set worldRotation(value: Vector3) {
    if (this._worldRotation !== value) {
      value.cloneTo(this._worldRotation);
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

  /**
   * World rotation, defining the rotation by using a unit quaternion.
   */
  get worldRotationQuaternion(): Quaternion {
    const worldRotationQuaternion = this._worldRotationQuaternion;
    this.rotationQuaternion.cloneTo(worldRotationQuaternion);
    return worldRotationQuaternion;
  }

  get scale(): Vector3 {
    return this._scale;
  }

  set scale(value: Vector3) {
    if (this._scale !== value) {
      value.cloneTo(this._scale);
    }
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

  /**
   * Rotate and ensure that the world front vector points to the target world position.
   * @param targetPosition - Target world position
   * @param worldUp - Up direction in world space, default is Vector3(0, 1, 0)
   */
  lookAt(targetPosition: Vector3, worldUp?: Vector3): void {
    const zAxis = Transform._tempVec30;
    Vector3.subtract(this.worldPosition, targetPosition, zAxis);
    let axisLen = zAxis.length();
    if (axisLen <= MathUtil.zeroTolerance) {
      // The current position and the target position are almost the same.
      return;
    }
    zAxis.scale(1 / axisLen);
    const xAxis = Transform._tempVec31;
    if (worldUp) {
      Vector3.cross(worldUp, zAxis, xAxis);
    } else {
      xAxis.setValue(zAxis.z, 0, -zAxis.x);
    }
    axisLen = xAxis.length();
    if (axisLen <= MathUtil.zeroTolerance) {
      // @todo:
      // 1.worldup is（0,0,0）
      // 2.worldUp is parallel to zAxis
      return;
    }
    xAxis.scale(1 / axisLen);
    const yAxis = Transform._tempVec32;
    Vector3.cross(zAxis, xAxis, yAxis);

    const rotMat = Transform._tempMat41;
    const { elements: e } = rotMat;
    (e[0] = xAxis.x), (e[1] = xAxis.y), (e[2] = xAxis.z);
    (e[4] = yAxis.x), (e[5] = yAxis.y), (e[6] = yAxis.z);
    (e[8] = zAxis.x), (e[9] = zAxis.y), (e[10] = zAxis.z);
    rotMat.getRotation(this._worldRotationQuaternion);
  }

  constructor() {}
}
