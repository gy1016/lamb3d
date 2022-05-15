import { Shader } from './Shader';
import { ShaderUniform } from './ShaderUniform';
import { ShaderDataGroup } from './enums/ShaderDataGroup';
import { ShaderUniformBlock } from './ShaderUniformBlock';
import { ShaderData } from './ShaderData';
import { Renderer } from '../Renderer';

export class ShaderProgram {
  private static _counter = 0;

  id: number;

  readonly sceneUniformBlock: ShaderUniformBlock = new ShaderUniformBlock();
  readonly cameraUniformBlock: ShaderUniformBlock = new ShaderUniformBlock();
  readonly rendererUniformBlock: ShaderUniformBlock = new ShaderUniformBlock();
  readonly materialUniformBlock: ShaderUniformBlock = new ShaderUniformBlock();
  readonly otherUniformBlock: ShaderUniformBlock = new ShaderUniformBlock();

  attributeLocation: Record<string, GLint> = Object.create(null);

  private _isValid: boolean;
  private _gl: WebGLRenderingContext;
  private _vertexShader: WebGLShader;
  private _fragmentShader: WebGLShader;
  private _glProgram: WebGLProgram;

  get glProgram() {
    return this._glProgram;
  }

  /**
   * Whether this shader program is valid.
   */
  get isValid(): boolean {
    return this._isValid;
  }

  constructor(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
    this._gl = gl;
    this._glProgram = this._createProgram(vertexSource, fragmentSource);
    this.bind();

    if (this._glProgram) {
      this._isValid = true;
      this._recordLocation();
    } else {
      this._isValid = false;
    }

    this.id = ShaderProgram._counter++;
  }

  private _createProgram(vertexSource: string, fragmentSource: string): WebGLProgram | null {
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
    return program;
  }

  private _createShader(shaderType: number, shaderSource: string): WebGLShader | null {
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

  private _groupingUniform(uniform: ShaderUniform, group: ShaderDataGroup, isTexture: boolean): void {
    switch (group) {
      case ShaderDataGroup.Scene:
        if (isTexture) {
          this.sceneUniformBlock.textureUniforms.push(uniform);
        } else {
          this.sceneUniformBlock.constUniforms.push(uniform);
        }
        break;
      case ShaderDataGroup.Camera:
        if (isTexture) {
          this.cameraUniformBlock.textureUniforms.push(uniform);
        } else {
          this.cameraUniformBlock.constUniforms.push(uniform);
        }
        break;
      case ShaderDataGroup.Renderer:
        if (isTexture) {
          this.rendererUniformBlock.textureUniforms.push(uniform);
        } else {
          this.rendererUniformBlock.constUniforms.push(uniform);
        }
        break;
      case ShaderDataGroup.Material:
        if (isTexture) {
          this.materialUniformBlock.textureUniforms.push(uniform);
        } else {
          this.materialUniformBlock.constUniforms.push(uniform);
        }
        break;
      default:
        if (isTexture) {
          this.otherUniformBlock.textureUniforms.push(uniform);
        } else {
          this.otherUniformBlock.constUniforms.push(uniform);
        }
    }
  }

  /**
   * record the location of uniform/attribute.
   */
  private _recordLocation() {
    const gl = this._gl;
    const program = this._glProgram;
    const uniformInfos = this._getUniformInfos();
    const attributeInfos = this._getAttributeInfos();

    uniformInfos.forEach(({ name, size, type }) => {
      const shaderUniform = new ShaderUniform(gl);
      let isArray = false;
      let isTexture = false;

      if (name.indexOf('[0]') > 0) {
        name = name.substr(0, name.length - 3);
        isArray = true;
      }

      const group = Shader._getShaderPropertyGroup(name);
      const location = gl.getUniformLocation(program, name);
      shaderUniform.name = name;
      shaderUniform.propertyId = Shader.getPropertyByName(name)._uniqueId;
      shaderUniform.location = location;

      switch (type) {
        case gl.FLOAT_MAT4:
          shaderUniform.applyFunc = isArray ? shaderUniform.uploadMat4v : shaderUniform.uploadMat4;
          break;
      }
      this._groupingUniform(shaderUniform, group, isTexture);
    });

    attributeInfos.forEach(({ name }) => {
      this.attributeLocation[name] = gl.getAttribLocation(program, name);
    });
  }

  private _getUniformInfos(): WebGLActiveInfo[] {
    const gl = this._gl;
    const program = this._glProgram;
    const uniformInfos = new Array<WebGLActiveInfo>();

    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; ++i) {
      const info = gl.getActiveUniform(program, i);
      uniformInfos[i] = info;
    }

    return uniformInfos;
  }

  private _getAttributeInfos(): WebGLActiveInfo[] {
    const gl = this._gl;
    const program = this._glProgram;
    const attributeInfos = new Array<WebGLActiveInfo>();

    const attributeCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < attributeCount; ++i) {
      const info = gl.getActiveAttrib(program, i);
      attributeInfos[i] = info;
    }

    return attributeInfos;
  }

  /**
   * Upload all shader data in shader uniform block.
   * @param uniformBlock - shader Uniform block
   * @param shaderData - shader data
   */
  uploadAll(uniformBlock: ShaderUniformBlock, shaderData: ShaderData): void {
    this.uploadUniforms(uniformBlock, shaderData);
  }

  /**
   * Upload constant shader data in shader uniform block.
   * @param uniformBlock - shader Uniform block
   * @param shaderData - shader data
   */
  uploadUniforms(uniformBlock: ShaderUniformBlock, shaderData: ShaderData): void {
    const properties = shaderData._properties;
    const constUniforms = uniformBlock.constUniforms;

    for (let i = 0, n = constUniforms.length; i < n; i++) {
      const uniform = constUniforms[i];
      const data = properties[uniform.propertyId];
      data != null && uniform.applyFunc(uniform, data);
    }
  }

  /**
   * Bind this shader program.
   * @returns Whether the shader program is switched.
   */
  bind(): boolean {
    if (Renderer.currentBindProgram !== this) {
      this._gl.useProgram(this._glProgram);
      Renderer.currentBindProgram = this;
      return true;
    } else {
      return false;
    }
  }

  destroy(): void {
    const gl = this._gl;
    this._vertexShader && gl.deleteShader(this._vertexShader);
    this._fragmentShader && gl.deleteShader(this._fragmentShader);
    this._glProgram && gl.deleteProgram(this._glProgram);
  }
}
