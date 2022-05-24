import { MathUtil, Matrix4, Quaternion, Vector2, Vector3, Vector4 } from '../math';
import { Engine } from './Engine';
import { Shader, ShaderData, ShaderDataGroup } from './shader';
import { Transform } from './Transform';

export class Camera {
  // 把引擎也引进来主要是为了获取到canvas的宽高
  // 便于设置透视投影矩阵与宽高比
  private _engine: Engine;

  public transform: Transform;

  private static _viewMatrixProperty = Shader.getPropertyByName('u_viewMat');
  private static _projectionMatrixProperty = Shader.getPropertyByName('u_projMat');
  private static _cameraPositionProperty = Shader.getPropertyByName('u_cameraPos');

  /**
   * Compute the inverse of the rotation translation matrix.
   * @param rotation - The rotation used to calculate matrix
   * @param translation - The translation used to calculate matrix
   * @param out - The calculated matrix
   */
  private static _rotationTranslationInv(rotation: Quaternion, translation: Vector3, out: Matrix4) {
    const oe = out.elements;
    const { x, y, z, w } = rotation;
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

    oe[0] = 1 - (yy + zz);
    oe[1] = xy + wz;
    oe[2] = xz - wy;
    oe[3] = 0;

    oe[4] = xy - wz;
    oe[5] = 1 - (xx + zz);
    oe[6] = yz + wx;
    oe[7] = 0;

    oe[8] = xz + wy;
    oe[9] = yz - wx;
    oe[10] = 1 - (xx + yy);
    oe[11] = 0;

    oe[12] = translation.x;
    oe[13] = translation.y;
    oe[14] = translation.z;
    oe[15] = 1;

    out.invert();
  }

  /** Shader data. */
  readonly shaderData: ShaderData = new ShaderData(ShaderDataGroup.Camera);

  /** Rendering priority - A Camera with higher priority will be rendered on top of a camera with lower priority. */
  priority: number = 0;

  private _isOrthographic: boolean = false;
  private _nearClipPlane: number = 0.1;
  private _farClipPlane: number = 100;
  private _fieldOfView: number = 45;
  private _orthographicSize: number = 10;
  // TODO
  private _customAspectRatio: number | undefined = undefined;

  private _projectionMatrix: Matrix4 = new Matrix4();
  private _viewMatrix: Matrix4 = new Matrix4();
  private _viewport: Vector4 = new Vector4(0, 0, 1, 1);
  // 这个东西有什么用呢
  private _lastAspectSize: Vector2 = new Vector2(0, 0);

  get viewMatrix(): Readonly<Matrix4> {
    Camera._rotationTranslationInv(
      this.transform.worldRotationQuaternion,
      this.transform.worldPosition,
      this._viewMatrix,
    );
    return this._viewMatrix;
  }

  set projectionMatrix(value: Matrix4) {
    this._projectionMatrix = value;
  }

  get projectionMatrix(): Matrix4 {
    const canvas = this._engine.canvas;
    this._lastAspectSize.x = canvas.width;
    this._lastAspectSize.y = canvas.height;
    const aspectRatio = this.aspectRatio;
    if (!this._isOrthographic) {
      Matrix4.perspective(
        MathUtil.degreeToRadian(this._fieldOfView),
        aspectRatio,
        this._nearClipPlane,
        this._farClipPlane,
        this._projectionMatrix,
      );
    } else {
      const width = this._orthographicSize * aspectRatio;
      const height = this._orthographicSize;
      Matrix4.ortho(-width, width, -height, height, this._nearClipPlane, this._farClipPlane, this._projectionMatrix);
    }
    return this._projectionMatrix;
  }

  /**
   * Near clip plane - the closest point to the camera when rendering occurs.
   */
  get nearClipPlane(): number {
    return this._nearClipPlane;
  }

  set nearClipPlane(value: number) {
    this._nearClipPlane = value;
  }

  /**
   * Far clip plane - the furthest point to the camera when rendering occurs.
   */
  get farClipPlane(): number {
    return this._farClipPlane;
  }

  set farClipPlane(value: number) {
    this._farClipPlane = value;
  }

  /**
   * The camera's view angle. activating when camera use perspective projection.
   */
  get fieldOfView(): number {
    return this._fieldOfView;
  }

  set fieldOfView(value: number) {
    this._fieldOfView = value;
  }

  // 获取宽高比
  get aspectRatio(): number {
    const canvas = this._engine.canvas;
    // 这里为什么还考虑了视口
    return this._customAspectRatio ?? (canvas.width * this._viewport.z) / (canvas.height * this._viewport.w);
  }

  set aspectRatio(value: number) {
    this._customAspectRatio = value;
  }

  /**
   * Viewport, normalized expression, the upper left corner is (0, 0), and the lower right corner is (1, 1).
   * @remarks Re-assignment is required after modification to ensure that the modification takes effect.
   */
  get viewport(): Vector4 {
    return this._viewport;
  }

  set viewport(value: Vector4) {
    if (value !== this._viewport) {
      value.cloneTo(this._viewport);
    }
  }

  /**
   * Whether it is orthogonal, the default is false. True will use orthographic projection, false will use perspective projection.
   */
  get isOrthographic(): boolean {
    return this._isOrthographic;
  }

  set isOrthographic(value: boolean) {
    this._isOrthographic = value;
  }

  get orthographicSize(): number {
    return this._orthographicSize;
  }

  set orthographicSize(value: number) {
    this._orthographicSize = value;
  }

  // 其实Entity和Camera应该再抽象上一层Component
  // TODO
  constructor(engine: Engine) {
    this._engine = engine;
    this.transform = new Transform();
  }

  private _updateShaderData(): void {
    const shaderData = this.shaderData;
    // 应该把VP矩阵都成好再传给gl，这一步得考虑在哪里做
    shaderData.setMatrix(Camera._viewMatrixProperty, this.viewMatrix);
    shaderData.setMatrix(Camera._projectionMatrixProperty, this.projectionMatrix);
    // shaderData.setVector3(Camera._cameraPositionProperty, this.transform.worldPosition);
  }

  render(): void {
    this._updateShaderData();
  }
}
