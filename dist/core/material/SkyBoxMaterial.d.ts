import { Engine } from '../Engine';
import { Material } from '../material';
import { TextureCube } from '../texture/TextureCube';
declare type IFaceInfo = {
    target: number;
    url: string;
};
/**
 * A skybox material built with a cube texture, used to display the starry sky, etc.
 */
export declare class SkyBoxMaterial extends Material {
    /** Cube texture. */
    textureCube: TextureCube;
    /** Six sided information array. */
    faceInfoArr: IFaceInfo[];
    /** Get the sampler for the cube texture in the shader. */
    static _skyboxprop: import("../shader").ShaderProperty;
    constructor(engine: Engine, faceInfoArr: IFaceInfo[]);
}
export {};
