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

class EngineObject {
    static _instanceIdCounter = 0;
    instanceId = ++EngineObject._instanceIdCounter;
    _engine;
    _destroyed = false;
    get engine() {
        return this._engine;
    }
    get destroyed() {
        return this._destroyed;
    }
    constructor(engine) {
        this._engine = engine;
    }
    destroy() {
        if (this._destroyed)
            return;
        console.log('destroy');
    }
}

class Entity extends EngineObject {
    /** The name of entity. */
    name;
    _children = [];
    _isRoot = false;
    _isActive = true;
    _parent = null;
    /**
     * Whether to activate locally.
     */
    get isActive() {
        return this._isActive;
    }
    /**
     * The parent entity.
     */
    get parent() {
        return this._parent;
    }
    /**
     * The children entities
     */
    get children() {
        return this._children;
    }
    /**
     * Number of the children entities
     */
    get childCount() {
        return this._children.length;
    }
    constructor(engine, name) {
        super(engine);
        this.name = name;
    }
}

class Engine {
    _hardwareRenderer;
    _canvas;
    get canvas() {
        return this._canvas;
    }
    constructor(canvas, hardwareRenderer) {
        this._hardwareRenderer = hardwareRenderer;
        this._hardwareRenderer.init(canvas);
        this._canvas = canvas;
    }
    createEntity(name) {
        return new Entity(this, name);
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
    resizeByClientSize() {
        const webCanvas = this._webCanvas;
        if (webCanvas instanceof HTMLCanvasElement) {
            this.width = webCanvas.clientWidth;
            this.height = webCanvas.clientHeight;
        }
    }
    constructor(webCanvas) {
        const width = webCanvas.width;
        const height = webCanvas.height;
        this._webCanvas = webCanvas;
        this._width = width;
        this._height = height;
    }
}

/**
 * WebGL mode.
 */
var WebGLMode;
(function (WebGLMode) {
    /** Auto, use WebGL2.0 if support, or will fallback to WebGL1.0. */
    WebGLMode[WebGLMode["Auto"] = 0] = "Auto";
    /** WebGL2.0. */
    WebGLMode[WebGLMode["WebGL2"] = 1] = "WebGL2";
    /** WebGL1.0, */
    WebGLMode[WebGLMode["WebGL1"] = 2] = "WebGL1";
})(WebGLMode || (WebGLMode = {}));
class WebGLRenderer {
    _options;
    _gl;
    _isWebGL2;
    _activeTextureID;
    /**
     * GL Context
     * @member {WebGLRenderingContext}
     */
    get gl() {
        return this._gl;
    }
    constructor(options = {}) {
        this._options = options;
    }
    init(canvas) {
        const webCanvas = canvas._webCanvas;
        const webGLMode = WebGLMode.Auto;
        let gl;
        if (webGLMode == WebGLMode.Auto || webGLMode == WebGLMode.WebGL1) {
            gl = webCanvas.getContext('webgl');
            this._isWebGL2 = false;
        }
        if (!gl) {
            throw new Error('Get GL Context FAILED.');
        }
        this._gl = gl;
        this._activeTextureID = gl.TEXTURE0;
    }
}

class WebGLEngine extends Engine {
    /**
     * Create an engine suitable for the WebGL platform.
     * @param canvas - Native web canvas
     * @param physics - Physics Engine
     * @param webGLRendererOptions - WebGL renderer options
     */
    constructor(canvas) {
        const webCanvas = new WebCanvas((typeof canvas === 'string' ? document.getElementById(canvas) : canvas));
        const hardwareRenderer = new WebGLRenderer();
        super(webCanvas, hardwareRenderer);
    }
    get canvas() {
        return this._canvas;
    }
}

export { Matrix4, Vector4, WebGLEngine };
