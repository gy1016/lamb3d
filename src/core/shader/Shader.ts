import { Engine } from '../Engine';
import { ShaderDataGroup } from './enums/ShaderDataGroup';
import { ShaderProgram } from './ShaderProgram';
import { ShaderProperty } from './ShaderProperty';

/**
 * Shader containing vertex and fragment source.
 */
export class Shader {
  /** Shader counter. */
  private static _shaderCounter = 0;
  /** Shader map. */
  private static _shaderMap: Record<string, Shader> = Object.create(null);
  /** Shader counter. */
  private static _propertyNameMap: Record<string, ShaderProperty> = Object.create(null);

  /** The name of shader. */
  readonly name: string;

  /** @internal */
  _shaderId = 0;

  /** Vertex shader source. */
  private _vertexSource: string;
  /** Fragment shader source. */
  private _fragmentSource: string;

  private constructor(name: string, vertexSource: string, fragmentSource: string) {
    this._shaderId = Shader._shaderCounter++;
    this.name = name;
    this._vertexSource = vertexSource;
    this._fragmentSource = fragmentSource;
  }

  /**
   * @internal
   */
  static _getShaderPropertyGroup(propertyName: string): ShaderDataGroup | null {
    const shaderProperty = Shader._propertyNameMap[propertyName];
    return shaderProperty?._group;
  }

  // 不存在就创建一个
  /**
   * Get shader property by name.
   * @param name - Name of the shader property
   * @returns Shader property
   */
  static getPropertyByName(name: string): ShaderProperty {
    const propertyNameMap = Shader._propertyNameMap;
    if (propertyNameMap[name] != null) {
      return propertyNameMap[name];
    } else {
      // 实例化的时候并不分配分组，即此时property还没有group属性
      const property = new ShaderProperty(name);
      propertyNameMap[name] = property;
      return property;
    }
  }

  /**
   * Create a shader.
   * @param name - Name of the shader.
   * @param vertexSource - Vertex source code.
   * @param fragmentSource - Fragment source code.
   */
  static create(name: string, vertexSource: string, fragmentSource: string): Shader {
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
  static find(name: string): Shader {
    return Shader._shaderMap[name];
  }

  /**
   * Create program based on shader.
   * @param engine
   * @returns Shader program.
   */
  _getShaderProgram(engine: Engine): ShaderProgram {
    // 将来可能在这里拼接glsl
    const vertexSource = this._vertexSource;
    const fragmentSource = this._fragmentSource;

    return new ShaderProgram(engine, vertexSource, fragmentSource);
  }
}
