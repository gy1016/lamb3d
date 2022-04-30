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
        const x = this.y * vec3.z - this.z * vec3.y;
        const y = this.z * vec3.x - this.x * vec3.z;
        const z = this.x * vec3.y - this.y * vec3.x;
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

class Canvas {
    _canvas;
    _width;
    _height;
    get width() {
        return this._width;
    }
    set width(value) {
        if (this._width !== value) {
            this._canvas.width = value;
            this._width = value;
        }
    }
    get height() {
        return this._height;
    }
    set height(value) {
        if (this._height !== value) {
            this._canvas.height = value;
            this._height = value;
        }
    }
    resizeByClientSize(pixelRatio = window.devicePixelRatio) {
        const webCanvas = this._canvas;
        if (webCanvas instanceof HTMLCanvasElement) {
            this.width = webCanvas.clientWidth * pixelRatio;
            this.height = webCanvas.clientHeight * pixelRatio;
        }
    }
    constructor(canvas) {
        const width = canvas.width;
        const height = canvas.height;
        this._canvas = canvas;
        this._width = width;
        this._height = height;
    }
}

class Entity {
    static id;
    id;
    name;
    mesh;
    material;
    static createId() {
        Entity.id = Entity.id + 1;
        return Entity.id;
    }
    constructor(name, mesh, material) {
        this.name = name;
        this.id = Entity.createId();
        this.mesh = mesh;
        this.material = material;
    }
}
Entity.id = 0;

class ShaderProgram {
    static _counter = 0;
    id;
    _isValid;
    _gl;
    _vertexShader;
    _fragmentShader;
    _glProgram;
    get glProgram() {
        return this._glProgram;
    }
    /**
     * Whether this shader program is valid.
     */
    get isValid() {
        return this._isValid;
    }
    constructor(gl, vertexSource, fragmentSource) {
        this._gl = gl;
        this._glProgram = this._createProgram(vertexSource, fragmentSource);
    }
    _createProgram(vertexSource, fragmentSource) {
        const gl = this._gl;
        // create and compile shader
        const vertexShader = this._createShader(gl.VERTEX_SHADER, vertexSource);
        if (!vertexShader) {
            return null;
        }
        const fragmentShader = this._createShader(gl.FRAGMENT_SHADER, fragmentSource);
        if (!fragmentShader) {
            return null;
        }
        // link program and shader
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.validateProgram(program);
        if (gl.isContextLost()) {
            console.error('Context lost while linking program.');
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            return null;
        }
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Could not link WebGL program. \n' + gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        this._vertexShader = vertexShader;
        this._fragmentShader = fragmentShader;
        this._isValid = true;
        return program;
    }
    _createShader(shaderType, shaderSource) {
        const gl = this._gl;
        const shader = gl.createShader(shaderType);
        if (!shader) {
            console.error('Context lost while create shader.');
            return null;
        }
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        if (gl.isContextLost()) {
            console.error('Context lost while compiling shader.');
            gl.deleteShader(shader);
            return null;
        }
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Could not compile WebGL shader.\n${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    destroy() {
        const gl = this._gl;
        this._vertexShader && gl.deleteShader(this._vertexShader);
        this._fragmentShader && gl.deleteShader(this._fragmentShader);
        this._glProgram && gl.deleteProgram(this._glProgram);
    }
}

class Render {
    static shaderProgram;
    // It would be better practice to encapsulate this information into a renderInfo
    static initArrayBuffer(gl, attribute, data, num, type) {
        const buffer = gl.createBuffer();
        if (!buffer) {
            console.log('Failed to create the buffer object');
            return false;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        const a_attribute = gl.getAttribLocation(Render.shaderProgram.glProgram, attribute);
        if (a_attribute < 0) {
            console.log('Failed to get the storage location of ' + attribute);
            return false;
        }
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
        gl.enableVertexAttribArray(a_attribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return true;
    }
    //
    static initShaderProgram(gl, entity) {
        const { shader } = entity.material;
        Render.shaderProgram = new ShaderProgram(gl, shader.vertexSource, shader.fragmentSource);
        return Render.shaderProgram.isValid;
    }
    static drawRender(gl, entity) {
        if (!Render.initShaderProgram(gl, entity)) {
            console.error('initShaderProgram failed...');
        }
        const data = new Float32Array(entity.mesh.getPostions());
        const indices = entity.mesh.getIndices();
        if (!Render.initArrayBuffer(gl, 'a_Position', data, 3, gl.FLOAT))
            return -1;
        const indexBuffer = gl.createBuffer();
        if (!indexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        return indices.length;
    }
}

class Scene {
    gl;
    canvas;
    entities;
    // params: any;
    /**
     * constructor
     * @param canvasId : getElementById
     * @param params : scene params
     */
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (canvas instanceof HTMLCanvasElement) {
            this.canvas = new Canvas(canvas);
            this.canvas.resizeByClientSize();
        }
        else {
            throw `canvas is not a HTMLCanvasElement!`;
        }
        const gl = canvas.getContext('webgl', {});
        this.gl = gl;
        this.entities = [];
    }
    /**
     * ClearColor, clearDepth, enable depth_test, clear color buffer bit and depth buffer bit
     * @param gl WebGLRenderingContext
     * @param rgba Scene background color
     */
    initRenderState(gl, rgba) {
        gl.clearColor(rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    addEntity(entity) {
        if (entity instanceof Entity) {
            if (this.entities == null) {
                this.entities = [];
            }
            this.entities.push(entity);
        }
    }
    run() {
        const gl = this.gl;
        const enti = this.entities.pop();
        const n = Render.drawRender(gl, enti);
        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    }
}

class Shader {
    static _shaderCounter = 0;
    static _shaderMap = Object.create(null);
    /** The name of shader. */
    name;
    /** @internal */
    _shaderId = 0;
    _vertexSource;
    _fragmentSource;
    get vertexSource() {
        return this._vertexSource;
    }
    get fragmentSource() {
        return this._fragmentSource;
    }
    constructor(name, vertexSource, fragmentSource) {
        this._shaderId = Shader._shaderCounter++;
        this.name = name;
        this._vertexSource = vertexSource;
        this._fragmentSource = fragmentSource;
    }
    /**
     * Create a shader.
     * @param name - Name of the shader
     * @param vertexSource - Vertex source code
     * @param fragmentSource - Fragment source code
     */
    static create(name, vertexSource, fragmentSource) {
        const shaderMap = Shader._shaderMap;
        if (shaderMap[name]) {
            throw `Shader named "${name}" already exists.`;
        }
        return (shaderMap[name] = new Shader(name, vertexSource, fragmentSource));
    }
    /**
     * Find a shader by name.
     * @param name - Name of the shader
     */
    static find(name) {
        return Shader._shaderMap[name];
    }
}

class Mesh {
    name;
    _positions = [];
    _normals = [];
    _uv = [];
    _indices;
    constructor(name) {
        this.name = name || '';
    }
    setPositions(positions) {
        this._positions = positions;
    }
    getPostions() {
        return this._positions;
    }
    setNormals(normals) {
        this._normals = normals;
    }
    getNormals() {
        return this._normals;
    }
    setUVs(uv) {
        this._uv = uv;
    }
    getUVs() {
        return this._uv;
    }
    setIndices(indices) {
        this._indices = indices;
    }
    getIndices() {
        return this._indices;
    }
}

class PrimitiveMesh {
    /**
     * According width, height and thick to create cube
     * @param width
     * @param height
     * @param thick
     * @returns return a mesh, include position, uv, normals and indicies
     */
    static createCuboid(width = 1, height = 1, thick = 1) {
        const a = width / 2;
        const b = height / 2;
        const c = thick / 2;
        // prettier-ignore
        const posArr = [
            // Front face
            // left botton start counterclockwise
            -a, -b, c,
            a, -b, c,
            a, b, c,
            -a, b, c,
            // Back face
            -a, -b, -c,
            -a, b, -c,
            a, b, -c,
            a, -b, -c,
            // Top face
            -a, b, -c,
            -a, b, c,
            a, b, c,
            a, b, -c,
            // Bottom face
            -a, -b, -c,
            a, -b, -c,
            a, -b, c,
            -a, -b, c,
            // Right face
            a, -b, -c,
            a, b, -c,
            a, b, c,
            a, -b, c,
            // Left face
            -a, -b, -c,
            -a, -b, c,
            -a, b, c,
            -a, b, -c,
        ];
        // prettier-ignore
        const uv = [
            // Front face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // back face
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            //top
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            //bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            //right
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            0.0, 0.0,
            //left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ];
        // prettier-ignore
        const vertexNormal = [
            // Front
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            // Back
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            // Top
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            // Right
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            // Left
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0
        ];
        // prettier-ignore
        const indices = new Uint16Array([
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23, // left
        ]);
        const mesh = new Mesh('CuboidMesh');
        PrimitiveMesh._initialize(mesh, posArr, vertexNormal, uv, indices);
        return mesh;
    }
    /**
     * According a series of data ti initialize mesh
     * @param mesh object's mesh
     * @param positions object's position array
     * @param normals object's normals array
     * @param uv object's uv array
     * @param indices object's indices array
     */
    static _initialize(mesh, positions, normals, uv, indices) {
        mesh.setPositions(positions);
        mesh.setNormals(normals);
        mesh.setUVs(uv);
        mesh.setIndices(indices);
    }
}

class Material {
    name;
    shader;
    constructor(name, vertexSource, fragmentSource) {
        this.name = name;
        this.shader = Shader.create(name, vertexSource, fragmentSource);
    }
}

export { Canvas, Entity, Material, Mesh, PrimitiveMesh, Render, Scene, Shader, ShaderProgram, Vector3, Vector4 };
