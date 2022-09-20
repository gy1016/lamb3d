import { ShaderUniform } from './ShaderUniform';
/**
 * Shader uniform block.
 * @internal
 */
export declare class ShaderUniformBlock {
    readonly constUniforms: ShaderUniform[];
    readonly textureUniforms: ShaderUniform[];
}
