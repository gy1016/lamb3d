import { Color } from '../math';
import { Engine } from './Engine';
import { BackgroundMode } from './enums/BackgroundMode';
import { Mesh } from './graphic';
import { Material } from './material';
/**
 * Background of the scene.
 */
export declare class Background {
    private _engine;
    /**
     * The pattern of the background, which may be a single color, a skybox or a picture texture.
     */
    mode: BackgroundMode;
    /** Grid for background. */
    _mesh: Mesh;
    /** The material used for the background. */
    _material: Material;
    /** Fixed color before skybox or texture is loaded successfully. */
    solidColor: Color;
    constructor(_engine: Engine);
    /**
     * Background with flat grid.
     * @param engine Engine instance.
     * @returns Mesh
     */
    private _createPlane;
}
