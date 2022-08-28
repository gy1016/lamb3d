import { Engine } from './Engine';
import { Background } from './Background';
import { Camera } from './Camera';
import { Entity } from './Entity';
import { ShaderData } from './shader';
import { AmbientLight, PointLight } from './lighting';
export declare class Scene {
    readonly shaderData: ShaderData;
    /** The engine the scene belongs to. */
    engine: Engine;
    /** A collection of entities in the scene, which is a tree. */
    entities: Entity[];
    /** Cameras in the scene, we only consider the case where there is only one camera in the scene. */
    camera: Camera;
    /** The background of the scene, the default is the skybox. */
    background: Background;
    /** Point lights in the scene. */
    pointLight: PointLight;
    /** Ambient light in the scene. */
    ambientLight: AmbientLight;
    /** Earth is the root entity in the scene. */
    private _rootEntity;
    get rootEntity(): Entity;
    /**
     * The camera and the earth are loaded by default inside the constructor.
     * @param engine The engine the scene belongs to.
     */
    constructor(engine: Engine);
    /**
     * Entities that need to be loaded into the scene, at the same level as the Earth.
     * @param entity Entity.
     * @returns The number of entities.
     */
    addEntity(entity: Entity): number;
}
