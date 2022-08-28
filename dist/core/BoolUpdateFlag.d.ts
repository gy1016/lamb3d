import { UpdateFlag } from './UpdateFlag';
/**
 * Used to update tags.
 */
export declare class BoolUpdateFlag extends UpdateFlag {
    /** Flag. */
    flag: boolean;
    /**
     * @inheritdoc
     */
    dispatch(): void;
}
