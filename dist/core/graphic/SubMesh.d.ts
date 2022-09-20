import { MeshTopology } from './enums/MeshTopology';
/**
 * Sub-mesh, mainly contains drawing information.
 */
export declare class SubMesh {
    /** Start drawing offset. */
    start: number;
    /** Drawing count. */
    count: number;
    /** Drawing topology. */
    topology: MeshTopology;
    /**
     * Create a sub-mesh.
     * @param start - Start drawing offset
     * @param count - Drawing count
     * @param topology - Drawing topology
     */
    constructor(start?: number, count?: number, topology?: MeshTopology);
}
