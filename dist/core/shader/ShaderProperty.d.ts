import { ShaderDataGroup } from './enums/ShaderDataGroup';
/**
 * Shader property.
 */
export declare class ShaderProperty {
    private static _propertyNameCounter;
    /** @internal */
    _uniqueId: number;
    /** @internal */
    _group: ShaderDataGroup;
    /** Shader property name. */
    readonly name: string;
    /**
     * @internal
     */
    constructor(name: string);
}
