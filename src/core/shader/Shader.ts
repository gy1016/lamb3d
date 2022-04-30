export class Shader {
  private static _shaderCounter = 0;
  private static _shaderMap: Record<string, Shader> = Object.create(null);

  /** The name of shader. */
  readonly name: string;

  /** @internal */
  _shaderId = 0;

  private _vertexSource: string;
  private _fragmentSource: string;

  get vertexSource() {
    return this._vertexSource;
  }

  get fragmentSource() {
    return this._fragmentSource;
  }

  private constructor(name: string, vertexSource: string, fragmentSource: string) {
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
}
