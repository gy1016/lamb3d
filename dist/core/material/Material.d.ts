import { Engine } from '../Engine';
import { Shader, ShaderData } from '../shader';
/**
 * Material base class.
 */
export declare class Material {
    /** Name. */
    name: string;
    /** Shader used by the material. */
    shader: Shader;
    engine: Engine;
    /** Shader data. */
    readonly shaderData: ShaderData;
    constructor(engine: Engine, shader: Shader);
}
