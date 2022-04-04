export interface IWebGLCtx extends WebGLRenderingContext {
    program?: WebGLProgram;
}
export declare class WeblGLEngine {
    gl: IWebGLCtx;
    constructor(canvasId: string);
}
