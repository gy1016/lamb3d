import { UpdateFlagManager } from './UpdateFlagManager';
/**
 * Used to update tags.
 */
export declare abstract class UpdateFlag {
    /** @internal */
    _flagManagers: UpdateFlagManager[];
    /**
     * Dispatch.
     * @param param - Parameter
     */
    abstract dispatch(param?: Object): void;
    /**
     * Clear.
     */
    clearFromManagers(): void;
    /**
     * Destroy.
     */
    destroy(): void;
    private _removeFromManagers;
}
