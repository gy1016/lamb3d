/**
 * Encapsulate canvas tag.
 */
export declare class Canvas {
    /** HTML canvas element. */
    _canvas: HTMLCanvasElement;
    private _width;
    private _height;
    /** Canvas element width. */
    get width(): number;
    set width(value: number);
    /** Canvas element height. */
    get height(): number;
    set height(value: number);
    /**
     * Resize by client size.
     * @param pixelRatio Device pixel ratio.
     */
    resizeByClientSize(pixelRatio?: number): void;
    /**
     * Wrap the canvas element.
     * @param canvas HTML canvas element.
     */
    constructor(canvas: HTMLCanvasElement);
}
