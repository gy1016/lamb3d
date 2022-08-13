import { Matrix4 } from '@lamb3d/math';
import { Transform } from '../Transform';

export class Light {
  protected transform: Transform;

  private _viewMat: Matrix4;
  private _inverseViewMat: Matrix4;

  // 这个暂时没什么用
  // 因为我们的点光源采用的是世界坐标系
  get viewMatrix() {
    if (!this._viewMat) this._viewMat = new Matrix4();
    Matrix4.invert(this.transform.worldMatrix, this._viewMat);
    return this._viewMat;
  }

  get inverseViewMatrix() {
    if (!this._inverseViewMat) this._inverseViewMat = new Matrix4();
    Matrix4.invert(this.viewMatrix, this._inverseViewMat);
    return this._inverseViewMat;
  }

  constructor() {
    this.transform = new Transform();
  }
}
