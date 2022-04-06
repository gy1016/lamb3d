export interface IWebGLCtx extends WebGLRenderingContext {
    program?: WebGLProgram;
}
export declare class WebGLEngine {
    webgl: IWebGLCtx;
    constructor(canvasId: string);
    useProgram(program: WebGLProgram): void;
}
