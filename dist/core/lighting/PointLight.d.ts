import { Vector3 } from '../../math';
import { Color } from '../../math/Color';
import { ShaderData } from '../shader';
import { Light } from './Light';
/**
 * Point light.
 */
export declare class PointLight extends Light {
    /** Get the address of the point light color uniform variable in the shader. */
    private static _colorProperty;
    /** Get the address of the uniform variable of the point light position in the shader. */
    private static _positionProperty;
    /** Blend object of color and position. */
    private static _combinedData;
    /** The color of the light, the default is white light. */
    color: Color;
    /** Intensity of light. */
    intensity: number;
    /** Final light color. */
    private _lightColor;
    /** Get the position of a point light. */
    get position(): Vector3;
    /**
     * Get the final light color.
     */
    get lightColor(): Color;
    constructor(position: Vector3);
    /**
     * Set variable value in shader.
     * @param shaderData Shader data.
     */
    _updateShaderData(shaderData: ShaderData): void;
    /**
     * Populate federated data.
     */
    _appendData(): void;
}
