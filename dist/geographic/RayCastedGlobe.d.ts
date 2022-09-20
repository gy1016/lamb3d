import { ModelMesh } from '../core/mesh';
import { Ellipsoid } from './Ellipsoid';
import { Material } from '../core/material';
import { Shader, ShaderData } from '../core/shader';
import { Engine } from '../core/Engine';
import { Entity } from '../core/Entity';
export declare class RayCastedGlobe {
    private static _shapeProperty;
    private _shape;
    private _shader;
    private _mesh;
    private _material;
    /** The collection of entities under the earth. */
    entities: Entity[];
    /** The ellipsoid parameters corresponding to the sphere. */
    get shape(): Ellipsoid;
    /** Cube mesh for GPU ray tracing. */
    get mesh(): ModelMesh;
    /** The material of the sphere selection. */
    get material(): Material;
    /** The shader of the sphere. */
    get shader(): Shader;
    /**
     * Create a cube grid and build a picture material based on the engine.
     * @param engine Engine instance.
     */
    constructor(engine: Engine);
    /**
     * Upload the parameters of the ellipsoid to the GPU.
     * @param shaderData Scene shaderdata.
     */
    uploadShaderData(shaderData: ShaderData): void;
}
