<<<<<<< HEAD
=======
class Vector2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

>>>>>>> 7c3f1a1f7eb865bd9c2b521842956ff66d39dcec
class Vector3 {
    x;
    y;
    z;
<<<<<<< HEAD
    constructor(x, y, z) {
=======
    constructor(x = 0, y = 0, z = 0) {
>>>>>>> 7c3f1a1f7eb865bd9c2b521842956ff66d39dcec
        this.x = x;
        this.y = y;
        this.z = z;
    }
<<<<<<< HEAD
    // copy a vector3
    copyFrom(vec3) {
        this.x = vec3.x;
        this.y = vec3.y;
        this.z = vec3.z;
=======
}

class Vector4 {
    elements;
    constructor(v) {
        this.elements = new Float32Array(4);
        if (v) {
            this.elements[0] = v[0];
            this.elements[1] = v[1];
            this.elements[2] = v[2];
            this.elements[3] = v[3];
        }
    }
}

class Matrix4 {
    elements;
    constructor(m) {
        if (!m)
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        else {
            const s = m.elements;
            const d = new Float32Array(16);
            for (let i = 0; i < 16; ++i) {
                d[i] = s[i];
            }
            this.elements = d;
        }
    }
    /**
     * Set this to Identity Matrix
     * @returns this
     */
    setIdentity() {
        const e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
>>>>>>> 7c3f1a1f7eb865bd9c2b521842956ff66d39dcec
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
<<<<<<< HEAD
    resizeByClientSize(pixelRatio = window.devicePixelRatio) {
        const webCanvas = this._webCanvas;
        if (webCanvas instanceof HTMLCanvasElement) {
            this.width = webCanvas.clientWidth * pixelRatio;
=======
    rotate(angle, x, y, z) {
        return this.concat(new Matrix4().setRotate(angle, x, y, z));
    }
    setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        let fx, fy, fz, sx, sy, sz;
        fx = centerX - eyeX;
        fy = centerY - eyeY;
        fz = centerZ - eyeZ;
        // Normalize f.
        const rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;
        // Calculate cross product of f and up.
        sx = fy * upZ - fz * upY;
        sy = fz * upX - fx * upZ;
        sz = fx * upY - fy * upX;
        // Normalize s.
        const rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;
        // Calculate cross product of s and f.
        const ux = sy * fz - sz * fy;
        const uy = sz * fx - sx * fz;
        const uz = sx * fy - sy * fx;
        // Set to this.
        const e = this.elements;
        e[0] = sx;
        e[1] = ux;
        e[2] = -fx;
        e[3] = 0;
        e[4] = sy;
        e[5] = uy;
        e[6] = -fy;
        e[7] = 0;
        e[8] = sz;
        e[9] = uz;
        e[10] = -fz;
        e[11] = 0;
        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;
        // Translate.
        return this.translate(-eyeX, -eyeY, -eyeZ);
    }
    lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
    }
}

class WebCanvas {
    _webCanvas;
    _width;
    _height;
    get width() {
        return this._width;
    }
    set width(value) {
        if (this._width !== value) {
            this._webCanvas.width = value;
            this._width = value;
        }
    }
    get height() {
        return this._height;
    }
    set height(value) {
        if (this._height !== value) {
            this._webCanvas.height = value;
            this._height = value;
        }
    }
    constructor(webCanvas) {
        const width = webCanvas.width;
        const height = webCanvas.height;
        this._webCanvas = webCanvas;
        this._width = width;
        this._height = height;
    }
    resizeByClientSize(pixelRatio = window.devicePixelRatio) {
        const webCanvas = this._webCanvas;
        if (webCanvas instanceof HTMLCanvasElement) {
            this.width = webCanvas.clientHeight * pixelRatio;
>>>>>>> 7c3f1a1f7eb865bd9c2b521842956ff66d39dcec
            this.height = webCanvas.clientHeight * pixelRatio;
        }
    }
}

<<<<<<< HEAD
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
=======
class WebGLContext {
    _gl;
    get gl() {
        return this._gl;
    }
    constructor(canvas, options = {}) {
        let { mode } = options;
        if (!mode) {
            mode = 'webgl';
        }
        // 这里有问题，目前只支持webgl的情况，其他mode后续引入
        const gl = canvas.getContext(mode);
        if (!gl) {
            throw new Error(`Failed to get the rendering context for ${mode}`);
        }
        this._gl = gl;
    }
    loadShader(type, source) {
        const shader = this._gl.createShader(type);
        if (shader === null) {
            console.log('unable to create shader');
            return null;
        }
        // Set the shader program
        this._gl.shaderSource(shader, source);
        // Compile the shader
        this._gl.compileShader(shader);
        // Check the result of compilation
        const compiled = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
        if (!compiled) {
            const error = this._gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            this._gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    createProgram(vshader, fshader) {
        // Create shader object
        const vertexShader = this.loadShader(this._gl.VERTEX_SHADER, vshader);
        const fragmentShader = this.loadShader(this._gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }
        // Create a program object
        const program = this._gl.createProgram();
        if (!program) {
            return null;
        }
        // Attach the shader objects
        this._gl.attachShader(program, vertexShader);
        this._gl.attachShader(program, fragmentShader);
        // Link the program object
        this._gl.linkProgram(program);
        // Check the result of linking
        const linked = this._gl.getProgramParameter(program, this._gl.LINK_STATUS);
        if (!linked) {
            const error = this._gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            this._gl.deleteProgram(program);
            this._gl.deleteShader(fragmentShader);
            this._gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    }
    initShaders(vshader, fshader) {
        const program = this.createProgram(vshader, fshader);
        if (!program) {
            console.log('Failed to create program');
            return false;
>>>>>>> 7c3f1a1f7eb865bd9c2b521842956ff66d39dcec
        }
        this._gl.useProgram(program);
        this._gl.program = program;
        return true;
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

<<<<<<< HEAD
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
=======
class WebGLEngine {
    ctx;
    webCanvas;
    constructor(canvas, options = {}) {
        let canvasEl;
        if (typeof canvas === 'string') {
            // 如果用户故意不传canvas的id该怎么处理呢？
            // 暂时未处理
            canvasEl = document.getElementById(canvas);
            if (!canvasEl) {
                throw new Error(`${canvas} not is a HTMLCanvasElement id`);
            }
        }
        else {
            canvasEl = canvas;
        }
        const webCanvas = new WebCanvas(canvasEl);
        this.webCanvas = webCanvas;
        const ctx = new WebGLContext(canvasEl, options);
        this.ctx = ctx;
    }
    init(vshader, fshader) {
        if (!this.ctx.initShaders(vshader, fshader)) {
            console.log('Failed to intialize shaders.');
        }
        this.ctx.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.ctx.gl.clear(this.ctx.gl.COLOR_BUFFER_BIT);
    }
}

export { Matrix4, Vector2, Vector3, Vector4, WebCanvas, WebGLContext, WebGLEngine };
>>>>>>> 7c3f1a1f7eb865bd9c2b521842956ff66d39dcec
