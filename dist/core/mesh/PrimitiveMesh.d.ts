import { Vector3 } from '../../math';
import { ModelMesh } from './ModelMesh';
import { Engine } from '../Engine';
/**
 * Create a Mesh of Simple Geometry.
 */
export declare class PrimitiveMesh {
    /**
     * Create a cuboid mesh.
     * @param width - Cuboid width
     * @param height - Cuboid height
     * @param depth - Cuboid depth
     * @returns Cuboid model mesh
     */
    static createCuboid(engine: Engine, width?: number, height?: number, depth?: number): ModelMesh;
    /**
     *
     * @param engine 引擎实例
     * @param level 正四面体递归切分等级
     * @returns 球网格实例
     */
    static createSphereBySliceTetrahedron(engine: Engine, level?: number): ModelMesh;
    /**
     * Create a sphere mesh.
     * @param engine - Engine
     * @param radius - Sphere radius
     * @param segments - Number of segments
     * @returns Sphere model mesh
     */
    static createSphereByParamEquation(engine: Engine, radius?: number, segments?: number): ModelMesh;
    /**
     *
     * @param engine - Engine
     * @param width - Plane width
     * @param height - Plane height
     * @param horizontalSegments - Plane horizontal segments
     * @param verticalSegments - Plane vertical segments
     * @param noLongerAccessible - Accessible
     * @returns Plane mesh
     */
    static createPlane(engine: Engine, width?: number, height?: number, horizontalSegments?: number, verticalSegments?: number, noLongerAccessible?: boolean): ModelMesh;
    static subdivide(positions: Vector3[], indices: number[], triangle: [number, number, number], level?: number): void;
    /**
     * According a series of data ti initialize mesh
     * @param mesh object's mesh
     * @param positions object's position array
     * @param normals object's normals array
     * @param uv object's uv array
     * @param indices object's indices array
     */
    private static _initialize;
    private static _generateIndices;
}
