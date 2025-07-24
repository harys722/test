// sound.js

// Initialize audio context and hover sound function
let audioContext;
let hoverSound;

function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Define the hover sound function
        hoverSound = function() {
            if (!audioContext) return;
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
    } catch (error) {
        console.error('Audio not supported:', error);
        hoverSound = () => {}; // fallback to empty function
    }
}

// Make init and getter globally available
window.initAudio = initAudio;
window.getHoverSound = () => hoverSound;

// Initialize audio on page load
window.addEventListener('load', () => {
    initAudio();
});
