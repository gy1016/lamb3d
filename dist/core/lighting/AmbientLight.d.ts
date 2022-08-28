import { ShaderData } from '../shader';
import { Color } from '../../math';
/**
 * Ambient light.
 */
export declare class AmbientLight {
    /** Get the address of the point ambient color uniform variable in the shader. */
    private static _colorProperty;
    /** The color of the light. */
    color: Color;
    constructor(color: Color);
    /**
     * Set variable value in shader.
     * @param shaderData Shader data.
     */
    _updateShaderData(shaderData: ShaderData): void;
}
