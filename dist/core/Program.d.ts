import { IWebGLCtx } from './WebGLEngine';
export declare class Program {
    constructor(gl: IWebGLCtx, vShader: string, fShader: string);
    static loadShader(gl: IWebGLCtx, type: number, source: string): WebGLShader;
}
