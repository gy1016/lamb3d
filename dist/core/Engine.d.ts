import { Canvas } from './Canvas';
import { Time } from './base';
import { Texture2D } from './texture';
import { TextureCube } from './texture/TextureCube';
/**
 * The engine is the big steward of all content.
 */
export declare class Engine {
    /** The canvas corresponding to the engine. */
    protected _canvas: Canvas;
    /** WebGL rendering context. */
    protected _gl: WebGLRenderingContext;
    /** Current active scene. */
    private activeScene;
    /** Used to calculate the interval between each frame rendering. */
    private _time;
    /** Easy to destroy RAF. */
    private _requestId;
    /** Rendered 2D texture when the image has not been loaded yet. */
    _whiteTexture2D: Texture2D;
    /** Rendered cube texture when the image has not been loaded yet. */
    _whiteTextureCube: TextureCube;
    get canvas(): Canvas;
    get gl(): WebGLRenderingContext;
    get time(): Time;
    /**
     * Animation rendering.
     */
    private _animate;
    /**
     * Engine instance.
     * @param canvasId HTML canvas id.
     */
    constructor(canvasId: string);
    /**
     * Update all data.
     */
    update(): void;
    /**
     * Render based on updated data.
     */
    _render(): void;
    /**
     * Timing and rendering.
     */
    resume(): void;
    /**
     * Engine run.
     */
    run(): void;
}
