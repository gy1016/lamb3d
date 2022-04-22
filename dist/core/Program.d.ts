export declare class Program {
    gl: WebGLRenderingContext;
    constructor(gl: WebGLRenderingContext, vShader: string, fShader: string);
    static loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader;
    static initialShaderProgram(gl: WebGLRenderingContext, vShader: string, fShader: string): WebGLProgram;
    static createProgramInfo(gl: WebGLRenderingContext, shaderProgram: WebGLProgram): void;
}
