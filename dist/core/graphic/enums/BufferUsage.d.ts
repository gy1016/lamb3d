/**
 * Buffer usage.
 */
export declare enum BufferUsage {
    /** The buffer content are intended to be specified once, and used many times */
    Static = 0,
    /** The buffer contents are intended to be respecified repeatedly, and used many times */
    Dynamic = 1,
    /** The buffer contents are intended to be specified once, and used at most a few times */
    Stream = 2
}
