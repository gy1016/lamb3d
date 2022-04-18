class Vector2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Vector3 {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
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
    }
    /**
     * Copy reference matrix to this
     * @param src Reference Matrix
     * @returns this
     */
    set(src) {
        const s = src.elements, d = this.elements;
        if (s === d) {
            return;
        }
        for (let i = 0; i < 16; ++i) {
            d[i] = s[i];
        }
        return this;
    }
    /**
     * A = A * B
     * @param other Reference Matrix
     * @returns this
     */
    concat(other) {
        let i, b, ai0, ai1, ai2, ai3;
        const e = this.elements;
        const a = this.elements;
        b = other.elements;
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }
        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        return this;
    }
    multiply = this.concat;
    /**
     * Transpose matrix
     * @returns this
     */
    transpose() {
        let t;
        const e = this.elements;
        t = e[1];
        e[1] = e[4];
        e[4] = t;
        t = e[2];
        e[2] = e[8];
        e[8] = t;
        t = e[3];
        e[3] = e[12];
        e[12] = t;
        t = e[6];
        e[6] = e[9];
        e[9] = t;
        t = e[7];
        e[7] = e[13];
        e[13] = t;
        t = e[11];
        e[11] = e[14];
        e[14] = t;
        return this;
    }
    /**
     * inv(A) = A* / |A|
     * @param other Reference Matrix
     * @returns
     */
    setInverseOf(other) {
        let i, det;
        const s = other.elements;
        const d = this.elements;
        const inv = new Float32Array(16);
        inv[0] =
            s[5] * s[10] * s[15] -
                s[5] * s[11] * s[14] -
                s[9] * s[6] * s[15] +
                s[9] * s[7] * s[14] +
                s[13] * s[6] * s[11] -
                s[13] * s[7] * s[10];
        inv[4] =
            -s[4] * s[10] * s[15] +
                s[4] * s[11] * s[14] +
                s[8] * s[6] * s[15] -
                s[8] * s[7] * s[14] -
                s[12] * s[6] * s[11] +
                s[12] * s[7] * s[10];
        inv[8] =
            s[4] * s[9] * s[15] -
                s[4] * s[11] * s[13] -
                s[8] * s[5] * s[15] +
                s[8] * s[7] * s[13] +
                s[12] * s[5] * s[11] -
                s[12] * s[7] * s[9];
        inv[12] =
            -s[4] * s[9] * s[14] +
                s[4] * s[10] * s[13] +
                s[8] * s[5] * s[14] -
                s[8] * s[6] * s[13] -
                s[12] * s[5] * s[10] +
                s[12] * s[6] * s[9];
        inv[1] =
            -s[1] * s[10] * s[15] +
                s[1] * s[11] * s[14] +
                s[9] * s[2] * s[15] -
                s[9] * s[3] * s[14] -
                s[13] * s[2] * s[11] +
                s[13] * s[3] * s[10];
        inv[5] =
            s[0] * s[10] * s[15] -
                s[0] * s[11] * s[14] -
                s[8] * s[2] * s[15] +
                s[8] * s[3] * s[14] +
                s[12] * s[2] * s[11] -
                s[12] * s[3] * s[10];
        inv[9] =
            -s[0] * s[9] * s[15] +
                s[0] * s[11] * s[13] +
                s[8] * s[1] * s[15] -
                s[8] * s[3] * s[13] -
                s[12] * s[1] * s[11] +
                s[12] * s[3] * s[9];
        inv[13] =
            s[0] * s[9] * s[14] -
                s[0] * s[10] * s[13] -
                s[8] * s[1] * s[14] +
                s[8] * s[2] * s[13] +
                s[12] * s[1] * s[10] -
                s[12] * s[2] * s[9];
        inv[2] =
            s[1] * s[6] * s[15] -
                s[1] * s[7] * s[14] -
                s[5] * s[2] * s[15] +
                s[5] * s[3] * s[14] +
                s[13] * s[2] * s[7] -
                s[13] * s[3] * s[6];
        inv[6] =
            -s[0] * s[6] * s[15] +
                s[0] * s[7] * s[14] +
                s[4] * s[2] * s[15] -
                s[4] * s[3] * s[14] -
                s[12] * s[2] * s[7] +
                s[12] * s[3] * s[6];
        inv[10] =
            s[0] * s[5] * s[15] -
                s[0] * s[7] * s[13] -
                s[4] * s[1] * s[15] +
                s[4] * s[3] * s[13] +
                s[12] * s[1] * s[7] -
                s[12] * s[3] * s[5];
        inv[14] =
            -s[0] * s[5] * s[14] +
                s[0] * s[6] * s[13] +
                s[4] * s[1] * s[14] -
                s[4] * s[2] * s[13] -
                s[12] * s[1] * s[6] +
                s[12] * s[2] * s[5];
        inv[3] =
            -s[1] * s[6] * s[11] +
                s[1] * s[7] * s[10] +
                s[5] * s[2] * s[11] -
                s[5] * s[3] * s[10] -
                s[9] * s[2] * s[7] +
                s[9] * s[3] * s[6];
        inv[7] =
            s[0] * s[6] * s[11] -
                s[0] * s[7] * s[10] -
                s[4] * s[2] * s[11] +
                s[4] * s[3] * s[10] +
                s[8] * s[2] * s[7] -
                s[8] * s[3] * s[6];
        inv[11] =
            -s[0] * s[5] * s[11] +
                s[0] * s[7] * s[9] +
                s[4] * s[1] * s[11] -
                s[4] * s[3] * s[9] -
                s[8] * s[1] * s[7] +
                s[8] * s[3] * s[5];
        inv[15] =
            s[0] * s[5] * s[10] -
                s[0] * s[6] * s[9] -
                s[4] * s[1] * s[10] +
                s[4] * s[2] * s[9] +
                s[8] * s[1] * s[6] -
                s[8] * s[2] * s[5];
        det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
        if (det === 0) {
            return this;
        }
        det = 1 / det;
        for (i = 0; i < 16; i++) {
            d[i] = inv[i] * det;
        }
        return this;
    }
    invert() {
        return this.setInverseOf(this);
    }
    /**
     * Set ortho matrix
     * @param left
     * @param right
     * @param bottom
     * @param top
     * @param near
     * @param far
     * @returns
     */
    setOrtho(left, right, bottom, top, near, far) {
        if (left === right || bottom === top || near === far) {
            throw 'null frustum';
        }
        const rw = 1 / (right - left);
        const rh = 1 / (top - bottom);
        const rd = 1 / (far - near);
        const e = this.elements;
        e[0] = 2 * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 2 * rh;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -2 * rd;
        e[11] = 0;
        e[12] = -(right + left) * rw;
        e[13] = -(top + bottom) * rh;
        e[14] = -(far + near) * rd;
        e[15] = 1;
        return this;
    }
    ortho(left, right, bottom, top, near, far) {
        return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
    }
    /**
     * Set perspective matrix
     * @param fovy spatial perspective
     * @param aspect box width / box height
     * @param near box near
     * @param far box far
     * @returns this
     */
    setPerspective(fovy, aspect, near, far) {
        if (near === far || aspect === 0) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }
        fovy = (Math.PI * fovy) / 180 / 2;
        const s = Math.sin(fovy);
        if (s === 0) {
            throw 'null frustum';
        }
        const rd = 1 / (far - near);
        const ct = Math.cos(fovy) / s;
        const e = this.elements;
        e[0] = ct / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = ct;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    }
    perspective(fovy, aspect, near, far) {
        return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
    }
    setScale(x, y, z) {
        const e = this.elements;
        e[0] = x;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = y;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = z;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    }
    scale(x, y, z) {
        const e = this.elements;
        e[0] *= x;
        e[4] *= y;
        e[8] *= z;
        e[1] *= x;
        e[5] *= y;
        e[9] *= z;
        e[2] *= x;
        e[6] *= y;
        e[10] *= z;
        e[3] *= x;
        e[7] *= y;
        e[11] *= z;
        return this;
    }
    setTranslate(x, y, z) {
        const e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = x;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = y;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = z;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    }
    translate(x, y, z) {
        const e = this.elements;
        e[12] += e[0] * x + e[4] * y + e[8] * z;
        e[13] += e[1] * x + e[5] * y + e[9] * z;
        e[14] += e[2] * x + e[6] * y + e[10] * z;
        e[15] += e[3] * x + e[7] * y + e[11] * z;
        return this;
    }
    setRotate(angle, x, y, z) {
        let len, rlen, nc, xy, yz, zx, xs, ys, zs;
        angle = (Math.PI * angle) / 180;
        const e = this.elements;
        let s = Math.sin(angle);
        const c = Math.cos(angle);
        if (0 !== x && 0 === y && 0 === z) {
            // Rotation around X axis
            if (x < 0) {
                s = -s;
            }
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = c;
            e[9] = -s;
            e[13] = 0;
            e[2] = 0;
            e[6] = s;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 !== y && 0 === z) {
            // Rotation around Y axis
            if (y < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = 0;
            e[8] = s;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = -s;
            e[6] = 0;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 === y && 0 !== z) {
            // Rotation around Z axis
            if (z < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = -s;
            e[8] = 0;
            e[12] = 0;
            e[1] = s;
            e[5] = c;
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
        }
        else {
            // Rotation around another axis
            len = Math.sqrt(x * x + y * y + z * z);
            if (len !== 1) {
                rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;
            e[0] = x * x * nc + c;
            e[1] = xy * nc + zs;
            e[2] = zx * nc - ys;
            e[3] = 0;
            e[4] = xy * nc - zs;
            e[5] = y * y * nc + c;
            e[6] = yz * nc + xs;
            e[7] = 0;
            e[8] = zx * nc + ys;
            e[9] = yz * nc - xs;
            e[10] = z * z * nc + c;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        return this;
    }
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

class Canvas {
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
            this.height = webCanvas.clientHeight * pixelRatio;
        }
    }
}

class Context {
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
        }
        this._gl.useProgram(program);
        this._gl.program = program;
        return true;
    }
}

class Viewer {
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
        const webCanvas = new Canvas(canvasEl);
        this.webCanvas = webCanvas;
        this.webCanvas.resizeByClientSize();
        const ctx = new Context(canvasEl, options);
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

class PrimitiveMesh {
    // 单例模式
    static _engine;
    static setInstance(engine) {
        if (!PrimitiveMesh._engine) {
            PrimitiveMesh._engine = engine;
        }
    }
    static getInstance() {
        if (PrimitiveMesh._engine) {
            return PrimitiveMesh._engine;
        }
    }
    /**
     * Create a cuboid mesh.
     * @param engine - WebGLEngine
     * @param width - Cuboid width
     * @param height - Cuboid height
     * @param depth - Cuboid depth
     * @returns Cuboid model mesh
     */
    static createCuboid(engine, width = 1, height = 1, depth = 1) {
        PrimitiveMesh.setInstance(engine);
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const halfDepth = depth / 2;
        const positions = new Array(24);
        const normals = new Array(24);
        const uvs = new Array(24);
        // Up
        positions[0] = new Vector3(-halfWidth, halfHeight, -halfDepth);
        positions[1] = new Vector3(halfWidth, halfHeight, -halfDepth);
        positions[2] = new Vector3(halfWidth, halfHeight, halfDepth);
        positions[3] = new Vector3(-halfWidth, halfHeight, halfDepth);
        normals[0] = new Vector3(0, 1, 0);
        normals[1] = new Vector3(0, 1, 0);
        normals[2] = new Vector3(0, 1, 0);
        normals[3] = new Vector3(0, 1, 0);
        uvs[0] = new Vector2(0, 0);
        uvs[1] = new Vector2(1, 0);
        uvs[2] = new Vector2(1, 1);
        uvs[3] = new Vector2(0, 1);
        // Down
        positions[4] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
        positions[5] = new Vector3(halfWidth, -halfHeight, -halfDepth);
        positions[6] = new Vector3(halfWidth, -halfHeight, halfDepth);
        positions[7] = new Vector3(-halfWidth, -halfHeight, halfDepth);
        normals[4] = new Vector3(0, -1, 0);
        normals[5] = new Vector3(0, -1, 0);
        normals[6] = new Vector3(0, -1, 0);
        normals[7] = new Vector3(0, -1, 0);
        uvs[4] = new Vector2(0, 1);
        uvs[5] = new Vector2(1, 1);
        uvs[6] = new Vector2(1, 0);
        uvs[7] = new Vector2(0, 0);
        // Left
        positions[8] = new Vector3(-halfWidth, halfHeight, -halfDepth);
        positions[9] = new Vector3(-halfWidth, halfHeight, halfDepth);
        positions[10] = new Vector3(-halfWidth, -halfHeight, halfDepth);
        positions[11] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
        normals[8] = new Vector3(-1, 0, 0);
        normals[9] = new Vector3(-1, 0, 0);
        normals[10] = new Vector3(-1, 0, 0);
        normals[11] = new Vector3(-1, 0, 0);
        uvs[8] = new Vector2(0, 0);
        uvs[9] = new Vector2(1, 0);
        uvs[10] = new Vector2(1, 1);
        uvs[11] = new Vector2(0, 1);
        // Right
        positions[12] = new Vector3(halfWidth, halfHeight, -halfDepth);
        positions[13] = new Vector3(halfWidth, halfHeight, halfDepth);
        positions[14] = new Vector3(halfWidth, -halfHeight, halfDepth);
        positions[15] = new Vector3(halfWidth, -halfHeight, -halfDepth);
        normals[12] = new Vector3(1, 0, 0);
        normals[13] = new Vector3(1, 0, 0);
        normals[14] = new Vector3(1, 0, 0);
        normals[15] = new Vector3(1, 0, 0);
        uvs[12] = new Vector2(1, 0);
        uvs[13] = new Vector2(0, 0);
        uvs[14] = new Vector2(0, 1);
        uvs[15] = new Vector2(1, 1);
        // Front
        positions[16] = new Vector3(-halfWidth, halfHeight, halfDepth);
        positions[17] = new Vector3(halfWidth, halfHeight, halfDepth);
        positions[18] = new Vector3(halfWidth, -halfHeight, halfDepth);
        positions[19] = new Vector3(-halfWidth, -halfHeight, halfDepth);
        normals[16] = new Vector3(0, 0, 1);
        normals[17] = new Vector3(0, 0, 1);
        normals[18] = new Vector3(0, 0, 1);
        normals[19] = new Vector3(0, 0, 1);
        uvs[16] = new Vector2(0, 0);
        uvs[17] = new Vector2(1, 0);
        uvs[18] = new Vector2(1, 1);
        uvs[19] = new Vector2(0, 1);
        // Back
        positions[20] = new Vector3(-halfWidth, halfHeight, -halfDepth);
        positions[21] = new Vector3(halfWidth, halfHeight, -halfDepth);
        positions[22] = new Vector3(halfWidth, -halfHeight, -halfDepth);
        positions[23] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
        normals[20] = new Vector3(0, 0, -1);
        normals[21] = new Vector3(0, 0, -1);
        normals[22] = new Vector3(0, 0, -1);
        normals[23] = new Vector3(0, 0, -1);
        uvs[20] = new Vector2(1, 0);
        uvs[21] = new Vector2(0, 0);
        uvs[22] = new Vector2(0, 1);
        uvs[23] = new Vector2(1, 1);
        const indices = new Uint16Array(36);
        // prettier-ignore
        // Up
        indices[0] = 0, indices[1] = 2, indices[2] = 1, indices[3] = 2, indices[4] = 0, indices[5] = 3,
            // Down
            indices[6] = 4, indices[7] = 6, indices[8] = 7, indices[9] = 6, indices[10] = 4, indices[11] = 5,
            // Left
            indices[12] = 8, indices[13] = 10, indices[14] = 9, indices[15] = 10, indices[16] = 8, indices[17] = 11,
            // Right
            indices[18] = 12, indices[19] = 14, indices[20] = 15, indices[21] = 14, indices[22] = 12, indices[23] = 13,
            // Front
            indices[24] = 16, indices[25] = 18, indices[26] = 17, indices[27] = 18, indices[28] = 16, indices[29] = 19,
            // Back
            indices[30] = 20, indices[31] = 22, indices[32] = 23, indices[33] = 22, indices[34] = 20, indices[35] = 21;
        PrimitiveMesh._initialize(positions, normals, uvs, indices);
    }
    static initArrayBuffer(data, num, type, attribute) {
        const engine = PrimitiveMesh.getInstance();
        const gl = engine.ctx.gl;
        // Create a buffer object
        const buffer = gl.createBuffer();
        if (!buffer) {
            console.log('Failed to create the buffer object');
            return false;
        }
        // Write date into the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        // Assign the buffer object to the attribute letiable
        const a_attribute = gl.getAttribLocation(gl.program, attribute);
        if (a_attribute < 0) {
            console.log('Failed to get the storage location of ' + attribute);
            return false;
        }
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
        // Enable the assignment of the buffer object to the attribute letiable
        gl.enableVertexAttribArray(a_attribute);
        return true;
    }
    static _initialize(positions, normals, uvs, indices) {
        const engine = PrimitiveMesh.getInstance();
        const gl = engine.ctx.gl;
        const indexBuffer = gl.createBuffer();
        const vertices = new Float32Array(positions.reduce((pre, cur) => [...pre, cur.x, cur.y, cur.z], []));
        if (!indexBuffer)
            return -1;
        if (!PrimitiveMesh.initArrayBuffer(vertices, 3, gl.FLOAT, 'a_Position'))
            return -1;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        const n = indices.length;
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    }
}

export { Canvas, Context, Matrix4, PrimitiveMesh, Vector2, Vector3, Vector4, Viewer };
