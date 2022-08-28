import { Matrix4 } from '../../math';
import { Transform } from '../Transform';
/**
 * Lighting model base class.
 */
export declare class Light {
    /** Light source position. */
    protected transform: Transform;
    private _viewMat;
    private _inverseViewMat;
    /**
     * Get the view matrix of the light source position.
     */
    get viewMatrix(): Matrix4;
    /**
     * Get the inverse of the view matrix for the light source position.
     */
    get inverseViewMatrix(): Matrix4;
    constructor();
}
