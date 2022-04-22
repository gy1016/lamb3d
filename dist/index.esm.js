class Vector3 {
    x;
    y;
    z;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // copy a vector3
    copyFrom(vec3) {
        this.x = vec3.x;
        this.y = vec3.y;
        this.z = vec3.z;
    }
    /**
     * dot multiply
     * @param vec3
     * @returns new Vector
     */
    dot(vec3) {
        return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
    }
    /**
     * i   j   k
     * x1  y1  z1
     * x2  y2  z2
     */
    cross(vec3) {
        let x = this.y * vec3.z - this.z * vec3.y;
        let y = this.z * vec3.x - this.x * vec3.z;
        let z = this.x * vec3.y - this.y * vec3.x;
        return new Vector3(x, y, z);
    }
    sub(vec3) {
        return new Vector3(this.x - vec3.x, this.y - vec3.y, this.z - vec3.z);
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    normalize() {
        const len = this.length;
        this.x = this.x / len;
        this.y = this.y / len;
        this.z = this.z / len;
    }
}

class Vector4 {
    x;
    y;
    z;
    w;
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    // copy a vector4
    copyFrom(vec4) {
        this.x = vec4.x;
        this.y = vec4.y;
        this.z = vec4.z;
        this.w = vec4.w;
    }
}

class MathUtil {
}

class Canvas {
    gl;
    _webCanvas;
    _width;
    _height;
    get width() {
        return this._width;
    }
    set width(value) {
        if (this._width !== value) {
            this._width = value;
        }
    }
    get height() {
        return this._height;
    }
    set height(value) {
        if (this._height !== value) {
            this._height = value;
        }
    }
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error(`${canvasId} is not a HTMLCanvasElement`);
        }
        this._webCanvas = canvas;
        this.gl = canvas.getContext('webgl');
        if (this.gl === null) {
            throw new Error(`Unable to initialize the webgl context`);
        }
    }
    resizeByClientSize(pixelRatio = window.devicePixelRatio) {
        const webCanvas = this._webCanvas;
        if (webCanvas instanceof HTMLCanvasElement) {
            this.width = webCanvas.clientWidth * pixelRatio;
            this.height = webCanvas.clientHeight * pixelRatio;
        }
    }
}

class Program {
    gl;
    constructor(gl, vShader, fShader) {
        this.gl = gl;
    }
    static loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const info = gl.getShaderInfoLog(shader);
            console.error(`shader compiler error type = ${type} info = ${info}`);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    static initialShaderProgram(gl, vShader, fShader) {
        const vs = Program.loadShader(gl, gl.VERTEX_SHADER, vShader);
        if (vs === null) {
            console.error('vertex shader got something wrong', vShader);
        }
        const fs = Program.loadShader(gl, gl.FRAGMENT_SHADER, fShader);
        if (fs === null) {
            console.error('fragment shader got something wrong', fShader);
        }
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vs);
        gl.attachShader(shaderProgram, fs);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error(`unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
            gl.deleteProgram(shaderProgram);
            return null;
        }
        return shaderProgram;
    }
    static createProgramInfo(gl, shaderProgram) { }
}

class Render {
    static drawBindAttributes(renderInfo) { }
    static drawBindUniforms(renderInfo) { }
    static drawRender(renderInfo) { }
}

class RenderInfo {
    gl;
    projectionMatrix;
    modelViewMatrix;
    programInfo;
    vertexBuffer;
    constructor(gl, projM, mvM, programInfo, vertexBuffer) {
        this.gl = gl;
        this.projectionMatrix = projM;
        this.modelViewMatrix = mvM;
        this.programInfo = programInfo;
        this.vertexBuffer = vertexBuffer;
    }
}

class Scene {
    cameraList;
    entityList;
    clearColor;
    gl;
    constructor(gl) {
        this.cameraList = [];
        this.entityList = [];
        this.clearColor = [0.3, 0.2, 0.2, 1.0];
        this.gl = gl;
    }
    initRenderState() {
        const gl = this.gl;
        gl.clearColor(...this.clearColor);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    draw() {
        this.initRenderState();
    }
}

class Engine {
    // one engine equal one canvas element
    canvas;
    activeScene;
    constructor(canvasId) {
        this.canvas = new Canvas(canvasId);
        this.canvas.resizeByClientSize();
    }
    createScene() {
        const gl = this.canvas.gl;
        this.activeScene = new Scene(gl);
        this.activeScene.draw();
    }
}

export { Canvas, Engine, MathUtil, Program, Render, RenderInfo, Scene, Vector3, Vector4 };
