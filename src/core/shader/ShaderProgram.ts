import { Shader } from './Shader';
import { ShaderUniform } from './ShaderUniform';
import { ShaderDataGroup } from './enums/ShaderDataGroup';
import { ShaderUniformBlock } from './ShaderUniformBlock';
import { ShaderData } from './ShaderData';
import { Renderer } from '../Renderer';
import { Engine } from '../Engine';
import { Texture } from '../texture';

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
  private _engine: Engine;
  private _gl: WebGLRenderingContext;
  private _vertexShader: WebGLShader;
  private _fragmentShader: WebGLShader;
  private _glProgram: WebGLProgram;
  // 当前激活的纹理单元
  private _activeTextureUint: number = 0;

  get glProgram() {
    return this._glProgram;
  }

  /**
   * Whether this shader program is valid.
   */
  get isValid(): boolean {
    return this._isValid;
  }

  constructor(engine: Engine, vertexSource: string, fragmentSource: string) {
    this._engine = engine;
    this._gl = engine.gl;
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

  // 将纹理数据或者uniform数据推入对应组的block
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
        case gl.FLOAT:
          if (isArray) {
            shaderUniform.applyFunc = shaderUniform.upload1fv;
          } else {
            shaderUniform.applyFunc = shaderUniform.upload1f;
            shaderUniform.cacheValue = 0;
          }
          break;
        case gl.FLOAT_VEC2:
          if (isArray) {
            shaderUniform.applyFunc = shaderUniform.upload2fv;
          }
          break;
        case gl.FLOAT_VEC3:
          if (isArray) {
            shaderUniform.applyFunc = shaderUniform.upload3fv;
          }
          break;
        case gl.FLOAT_VEC4:
          if (isArray) {
            shaderUniform.applyFunc = shaderUniform.upload4fv;
          }
          break;
        case gl.INT:
          if (isArray) {
            shaderUniform.applyFunc = shaderUniform.upload1iv;
          } else {
            shaderUniform.applyFunc = shaderUniform.upload1i;
            shaderUniform.cacheValue = 0;
          }
          break;
        case gl.INT_VEC2:
          if (isArray) {
            shaderUniform.applyFunc = shaderUniform.upload2iv;
          }
          break;
        case gl.INT_VEC4:
          if (isArray) {
            shaderUniform.applyFunc = shaderUniform.upload4iv;
          }
          break;
        case gl.FLOAT_MAT4:
          shaderUniform.applyFunc = isArray ? shaderUniform.uploadMat4v : shaderUniform.uploadMat4;
          break;
        case gl.SAMPLER_2D:
        case gl.SAMPLER_CUBE:
          let defaultTexture: Texture;
          switch (type) {
            case gl.SAMPLER_2D:
              defaultTexture = this._engine._whiteTexture2D;
              break;
            case gl.SAMPLER_CUBE:
              // 待作，添加一个默认包围盒
              break;
            default:
              throw new Error('Unsupported texture type.');
          }

          isTexture = true;
          const textureIndex = gl.TEXTURE0 + this._activeTextureUint;

          shaderUniform.textureDefault = defaultTexture;
          shaderUniform.textureIndex = textureIndex;
          shaderUniform.applyFunc = shaderUniform.uploadTexture;
          gl.uniform1i(location, this._activeTextureUint++);
          shaderUniform.uploadTexture(shaderUniform, defaultTexture);
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
    this.uploadTextures(uniformBlock, shaderData);
  }

  /**
   * Upload constant shader data in shader uniform block.
   * @param uniformBlock - shader Uniform block
   * @param shaderData - shader data
   */
  uploadUniforms(uniformBlock: ShaderUniformBlock, shaderData: ShaderData): void {
    // shaderData._properties是根据shaderproperty的id的值的哈希表
    // 因为以数字为键效率更高
    const properties = shaderData._properties;
    const constUniforms = uniformBlock.constUniforms;

    for (let i = 0, n = constUniforms.length; i < n; i++) {
      const uniform = constUniforms[i];
      const data = properties[uniform.propertyId];
      // 这里相当于把CPU中的值分配给GPU
      data != null && uniform.applyFunc(uniform, data);
    }
  }

  /**
   * Upload texture shader data in shader uniform block.
   * @param uniformBlock - shader Uniform block
   * @param shaderData - shader data
   */
  uploadTextures(uniformBlock: ShaderUniformBlock, shaderData: ShaderData): void {
    const properties = shaderData._properties;
    const textureUniforms = uniformBlock.textureUniforms;
    // textureUniforms property maybe null if ShaderUniformBlock not contain any texture.
    if (textureUniforms) {
      for (let i = 0, n = textureUniforms.length; i < n; i++) {
        const uniform = textureUniforms[i];
        const texture = properties[uniform.propertyId];
        if (texture) {
          uniform.applyFunc(uniform, texture);
        }
      }
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
