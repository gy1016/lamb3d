/**
 * Tools for calculating the time per frame.
 */
export declare class Time {
    private _clock;
    private _timeScale;
    private _deltaTime;
    private _startTime;
    private _lastTickTime;
    /**
     * Constructor of the Time.
     */
    constructor();
    /**
     * Set the current time as the end of rendering marker.
     */
    reset(): void;
    /**
     * Current Time
     */
    get nowTime(): number;
    /**
     * Time between two ticks
     */
    get deltaTime(): number;
    /**
     * Scaled delta time.
     */
    get timeScale(): number;
    set timeScale(s: number);
    /**
     * Unscaled delta time.
     */
    get unscaledDeltaTime(): number;
    /**
     * The elapsed time, after the clock is initialized.
     */
    get timeSinceStartup(): number;
    /**
     * Call every frame, update delta time and other data.
     */
    tick(): void;
}
