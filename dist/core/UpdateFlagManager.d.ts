import { UpdateFlag } from './UpdateFlag';
/**
 * @internal
 */
export declare class UpdateFlagManager {
    /** @internal */
    _updateFlags: UpdateFlag[];
    /**
     * Create a UpdateFlag.
     * @returns - The UpdateFlag.
     */
    createFlag<T extends UpdateFlag>(type: new () => T): T;
    /**
     * Add a UpdateFlag.
     * @param flag - The UpdateFlag.
     */
    addFlag(flag: UpdateFlag): void;
    /**
     * Dispatch.
     */
    dispatch(param?: Object): void;
}
