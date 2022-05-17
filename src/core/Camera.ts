import { Matrix4 } from '../math';
import { Shader, ShaderData, ShaderDataGroup } from './shader';
import { Transform } from './Transform';

export class Camera {
  private static _viewMatrixProperty = Shader.getPropertyByName('u_viewMat');
  private static _projectionMatrixProperty = Shader.getPropertyByName('u_projMat');
  private static _vpMatrixProperty = Shader.getPropertyByName('u_VPMat');

  /** Shader data. */
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Camera);

  /** Rendering priority - A Camera with higher priority will be rendered on top of a camera with lower priority. */
  priority: number = 0;

  private _isOrthographic: boolean = false;
  private _isProjMatSetting = false;
  private _nearClipPlane: number = 0.1;
  private _farClipPlane: number = 100;
  private _fieldOfView: number = 45;

  private _transform: Transform;
  private _projectionMatrix: Matrix4 = new Matrix4();
  private _viewMatrix: Matrix4 = new Matrix4();

  get viewMatrix(): Readonly<Matrix4> {
    return this._viewMatrix;
  }
  set projectionMatrix(value: Matrix4) {
    this._projectionMatrix = value;
  }

  get projectionMatrix(): Matrix4 {
    return this._projectionMatrix;
  }

  constructor() {
    this._transform = new Transform();
  }

  private _updateShaderData(): void {
    const shaderData = this.shaderData;
    shaderData.setMatrix(Camera._viewMatrixProperty, this.viewMatrix);
    shaderData.setMatrix(Camera._projectionMatrixProperty, this.projectionMatrix);
  }

  render(): void {
    this._updateShaderData();
  }
}
