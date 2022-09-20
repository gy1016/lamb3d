import { OrbitControl } from '../controls/OrbitControl';
import { Matrix4, Vector4 } from '../math';
import { Engine } from './Engine';
import { ShaderData } from './shader';
import { Transform } from './Transform';
/**
 * Camera.
 */
export declare class Camera {
    private static _tempViewMatrix;
    private _engine;
    get engine(): Engine;
    transform: Transform;
    private static _viewMatrixProperty;
    private static _projectionMatrixProperty;
    private static _inverseVPMatrixProperty;
    private static _vpMatrixProperty;
    private static _cameraPositionProperty;
    private static _cameraPosSquaredProperty;
    /**
     * Compute the inverse of the rotation translation matrix.
     * @param rotation - The rotation used to calculate matrix
     * @param translation - The translation used to calculate matrix
     * @param out - The calculated matrix
     */
    private static _rotationTranslationInv;
    /** Shader data. */
    readonly shaderData: ShaderData;
    /** Rendering priority - A Camera with higher priority will be rendered on top of a camera with lower priority. */
    priority: number;
    orbitControl: OrbitControl;
    private _isOrthographic;
    private _nearClipPlane;
    private _farClipPlane;
    private _fieldOfView;
    private _orthographicSize;
    private _customAspectRatio;
    private _projectionMatrix;
    private _viewMatrix;
    private _viewport;
    private _lastAspectSize;
    get viewMatrix(): Readonly<Matrix4>;
    set projectionMatrix(value: Matrix4);
    get projectionMatrix(): Matrix4;
    /**
     * Near clip plane - the closest point to the camera when rendering occurs.
     */
    get nearClipPlane(): number;
    set nearClipPlane(value: number);
    /**
     * Far clip plane - the furthest point to the camera when rendering occurs.
     */
    get farClipPlane(): number;
    set farClipPlane(value: number);
    /**
     * The camera's view angle. activating when camera use perspective projection.
     */
    get fieldOfView(): number;
    set fieldOfView(value: number);
    get aspectRatio(): number;
    set aspectRatio(value: number);
    /**
     * Viewport, normalized expression, the upper left corner is (0, 0), and the lower right corner is (1, 1).
     * @remarks Re-assignment is required after modification to ensure that the modification takes effect.
     */
    get viewport(): Vector4;
    set viewport(value: Vector4);
    /**
     * Whether it is orthogonal, the default is false. True will use orthographic projection, false will use perspective projection.
     */
    get isOrthographic(): boolean;
    set isOrthographic(value: boolean);
    get orthographicSize(): number;
    set orthographicSize(value: number);
    constructor(engine: Engine);
    /**
     * Upload camera-related shader data.
     */
    private _updateShaderData;
    /**
     * The upload method is triggered by render.
     */
    render(): void;
}
