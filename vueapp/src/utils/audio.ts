export const playSound = (soundFile: string, volume: number = 0.5) => {
    try {
        const audio = new Audio(`/sounds/${soundFile}`);
        audio.volume = volume;
        audio.play().catch((e) => {
            // Ignore errors (e.g., file not found or user didn't interact with document yet)
            console.warn(`Could not play sound: ${soundFile}`, e);
        });
    } catch (e) {
        console.error("Audio playback error:", e);
    }
};
