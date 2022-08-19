import { Matrix4 } from '../../math';
import { Transform } from '../Transform';

/**
 * Lighting model base class.
 */
export class Light {
  // TODO: 这个抽的不好，只有点光源需要位
  /** Light source position. */
  protected transform: Transform;

  private _viewMat: Matrix4;
  private _inverseViewMat: Matrix4;

  // 这个暂时没什么用
  // 因为我们的点光源采用的是世界坐标系
  /**
   * Get the view matrix of the light source position.
   */
  get viewMatrix() {
    if (!this._viewMat) this._viewMat = new Matrix4();
    Matrix4.invert(this.transform.worldMatrix, this._viewMat);
    return this._viewMat;
  }

  /**
   * Get the inverse of the view matrix for the light source position.
   */
  get inverseViewMatrix() {
    if (!this._inverseViewMat) this._inverseViewMat = new Matrix4();
    Matrix4.invert(this.viewMatrix, this._inverseViewMat);
    return this._inverseViewMat;
  }

  constructor() {
    this.transform = new Transform();
  }
}
