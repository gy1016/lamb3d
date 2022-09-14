import { Engine } from './Engine';
import { Background } from './Background';
import { Camera } from './Camera';
import { ShaderData } from './shader';
import { AmbientLight, PointLight } from './lighting';
import { RayCastedGlobe } from '../geographic/RayCastedGlobe';
export declare class Scene {
    readonly shaderData: ShaderData;
    /** The engine the scene belongs to. */
    engine: Engine;
    /** Cameras in the scene, we only consider the case where there is only one camera in the scene. */
    camera: Camera;
    /** The background of the scene, the default is the skybox. */
    background: Background;
    /** Point lights in the scene. */
    pointLight: PointLight;
    /** Ambient light in the scene. */
    ambientLight: AmbientLight;
    /** Earth is the root entity in the scene. */
    private readonly _globe;
    get globe(): RayCastedGlobe;
    /**
     * The camera and the earth are loaded by default inside the constructor.
     * @param engine The engine the scene belongs to.
     */
    constructor(engine: Engine);
}
