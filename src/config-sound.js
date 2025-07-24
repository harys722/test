// sound.js

// Declare the audioContext and hoverSound globally
let audioContext;
let hoverSound;

// Initialize or resume the audio context and define the hover sound function
function initAudio() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.error('AudioContext not supported:', error);
            // fallback or disable sound if needed
            return;
        }
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Define the hover sound function
    hoverSound = function() {
        if (!audioContext) return;

        // Resume if suspended each time before playing
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    };
}

// Make initAudio and getHoverSound globally available
window.initAudio = initAudio;
window.getHoverSound = () => {
    if (typeof hoverSound === 'function') {
        hoverSound();
    }
};
