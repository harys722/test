// Social Media Icons Image URLs
const SOCIAL_ICONS = {
    github: "https://cdn.harys.is-a.dev/icons/github.svg",
    gitlab: "https://cdn.harys.is-a.dev/icons/gitlab.svg",
    discord: "https://cdn.harys.is-a.dev/icons/discord.svg",
    reddit: "https://cdn.harys.is-a.dev/icons/reddit.svg",
    email: "https://cdn.harys.is-a.dev/icons/gmail.svg",
    website: "https://cdn.harys.is-a.dev/icons/website.svg",
    bitbucket: "https://cdn.harys.is-a.dev/icons/bitbucket.svg",
    codepen: "https://cdn.harys.is-a.dev/icons/codepen.svg",
    replit: "https://cdn.harys.is-a.dev/icons/replit.svg",
    stackoverflow: "https://cdn.harys.is-a.dev/icons/stackoverflow.svg",
    telegram: "https://cdn.harys.is-a.dev/icons/telegram.svg",
    whatsapp: "https://cdn.harys.is-a.dev/icons/whatsapp.svg",
    signal: "https://cdn.harys.is-a.dev/icons/signal.svg",
    skype: "https://cdn.harys.is-a.dev/icons/skype.svg",
    twitter: "https://cdn.harys.is-a.dev/icons/x.svg",
    facebook: "https://cdn.harys.is-a.dev/icons/facebook.svg",
    instagram: "https://cdn.harys.is-a.dev/icons/instagram.svg",
    tiktok: "https://cdn.harys.is-a.dev/icons/tiktok.svg",
    snapchat: "https://cdn.harys.is-a.dev/icons/snapchat.svg",
    mastodon: "https://cdn.harys.is-a.dev/icons/mastodon.svg",
    bluesky: "https://cdn.harys.is-a.dev/icons/bluesky.svg",
    threads: "https://cdn.harys.is-a.dev/icons/threads.svg",
    linkedin: "https://cdn.harys.is-a.dev/icons/linkedin.svg",
    behance: "https://cdn.harys.is-a.dev/icons/behance.svg",
    dribbble: "https://cdn.harys.is-a.dev/icons/dribbble.svg",
    upwork: "https://cdn.harys.is-a.dev/icons/upwork.svg",
    fiverr: "https://cdn.harys.is-a.dev/icons/fiverr.svg",
    youtube: "https://cdn.harys.is-a.dev/icons/youtube.svg",
    twitch: "https://cdn.harys.is-a.dev/icons/twitch.svg",
    medium: "https://cdn.harys.is-a.dev/icons/medium.svg",
    devto: "https://cdn.harys.is-a.dev/icons/devto.svg",
    hashnode: "https://cdn.harys.is-a.dev/icons/hashnode.svg",
    substack: "https://cdn.harys.is-a.dev/icons/substack.svg",
    steam: "https://cdn.harys.is-a.dev/icons/steam.svg",
    epicgames: "https://cdn.harys.is-a.dev/icons/epicgames.svg",
    xbox: "https://cdn.harys.is-a.dev/icons/xbox.svg",
    playstation: "https://cdn.harys.is-a.dev/icons/playstation.svg",
    spotify: "https://cdn.harys.is-a.dev/icons/spotify.svg",
    soundcloud: "https://cdn.harys.is-a.dev/icons/soundcloud.svg",
    applemusic: "https://cdn.harys.is-a.dev/icons/applemusic.svg",
    bandcamp: "https://cdn.harys.is-a.dev/icons/bandcamp.svg",
    pinterest: "https://cdn.harys.is-a.dev/icons/pinterest.svg",
    tumblr: "https://cdn.harys.is-a.dev/icons/tumblr.svg",
    flickr: "https://cdn.harys.is-a.dev/icons/flickr.svg",
    vimeo: "https://cdn.harys.is-a.dev/icons/vimeo.svg",
    patreon: "https://cdn.harys.is-a.dev/icons/patreon.svg",
    kofi: "https://cdn.harys.is-a.dev/icons/kofi.svg",
    buymeacoffee: "https://cdn.harys.is-a.dev/icons/buymeacoffee.svg"
};

// Enhanced Audio System
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.isEnabled = true;
        this.volume = 0.3;
        this.init();
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await this.loadSounds();
        } catch (error) {
            console.log('Audio context not supported');
            this.isEnabled = false;
        }
    }

    async loadSounds() {
        const soundConfigs = {
            hover: { frequency: 800, duration: 0.1, type: 'sine' },
            click: { frequency: 600, duration: 0.15, type: 'square' },
            success: { frequency: 1000, duration: 0.2, type: 'sine' },
            notification: { frequency: 900, duration: 0.25, type: 'triangle' }
        };

        for (const [name, config] of Object.entries(soundConfigs)) {
            this.sounds[name] = config;
        }
    }

    play(soundName) {
        if (!this.isEnabled || !this.audioContext || !this.sounds[soundName]) return;

        const config = this.sounds[soundName];
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = config.frequency;
        oscillator.type = config.type;

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + config.duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + config.duration);
    }

    toggle() {
        this.isEnabled = !this.isEnabled;
        return this.isEnabled;
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
}

// Enhanced Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.isActive = false;
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '5';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle(x, y, color = '#ffd700') {
        const particle = {
            x,
            y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            decay: 0.02,
            size: Math.random() * 3 + 1,
            color,
            trail: []
        };
        this.particles.push(particle);
    }

    createBurst(x, y, count = 15, color = '#ffd700') {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 3 + 2;
            const particle = {
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.015,
                size: Math.random() * 2 + 1,
                color,
                trail: []
            };
            this.particles.push(particle);
        }
    }

    update() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.vy += 0.1; // gravity
            particle.vx *= 0.99; // friction

            // Add trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 5) {
                particle.trail.shift();
            }

            return particle.life > 0;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;

            // Draw trail
            if (particle.trail.length > 1) {
                this.ctx.strokeStyle = particle.color;
                this.ctx.lineWidth = particle.size * 0.5;
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                for (let i = 1; i < particle.trail.length; i++) {
                    this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                }
                this.ctx.stroke();
            }

            // Draw particle
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Interaction Effects
class InteractionEffects {
    constructor() {
        this.mouseTrail = [];
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });

            // Keep only recent trail points
            this.mouseTrail = this.mouseTrail.filter(point => 
                Date.now() - point.time < 1000
            );
        });

        this.animateMouseTrail();
    }

    animateMouseTrail() {
        const trailElement = document.createElement('div');
        trailElement.style.position = 'fixed';
        trailElement.style.pointerEvents = 'none';
        trailElement.style.zIndex = '1000';
        trailElement.style.width = '10px';
        trailElement.style.height = '10px';
        trailElement.style.borderRadius = '50%';
        trailElement.style.background = 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)';
        trailElement.style.transform = 'translate(-50%, -50%)';
        trailElement.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(trailElement);

        const updateTrail = () => {
            if (this.mouseTrail.length > 0) {
                const latest = this.mouseTrail[this.mouseTrail.length - 1];
                trailElement.style.left = latest.x + 'px';
                trailElement.style.top = latest.y + 'px';
                trailElement.style.opacity = '1';
            } else {
                trailElement.style.opacity = '0';
            }
            requestAnimationFrame(updateTrail);
        };

        updateTrail();
    }

    createRipple(x, y, element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';
        
        element.appendChild(ripple);

        const animation = ripple.animate([
            { width: '0px', height: '0px', opacity: '0.8' },
            { width: '100px', height: '100px', opacity: '0' }
        ], {
            duration: 600,
            easing: 'ease-out'
        });

        animation.onfinish = () => ripple.remove();
    }
}

// Enhanced Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.isMonitoring = false;
    }

    start() {
        this.isMonitoring = true;
        this.monitor();
    }

    monitor() {
        if (!this.isMonitoring) return;

        const now = performance.now();
        this.frameCount++;

        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
        }

        requestAnimationFrame(() => this.monitor());
    }

    getFPS() {
        return this.fps;
    }

    stop() {
        this.isMonitoring = false;
    }
}

// Enhanced initialization function (continued)
function initializeEnhancedProfile() {
    // Populate profile information
    const profileImg = document.getElementById('profile-img');
    const profileName = document.getElementById('profile-name');
    const profileDescription = document.getElementById('profile-description');
    const socialIconsContainer = document.querySelector('.social-icons');

    if (profileImg && typeof CONFIG !== 'undefined') {
        profileImg.src = CONFIG.profile.image;
        profileImg.onerror = () => {
            profileImg.src = 'https://cdn.harys.is-a.dev/avatars/main.png';
        };
    }

    if (profileName && typeof CONFIG !== 'undefined') {
        profileName.textContent = CONFIG.profile.name || 'Anonymous User';
    }

    if (profileDescription && typeof CONFIG !== 'undefined') {
        profileDescription.innerHTML = CONFIG.profile.description || 'No description available.';
    }

    // Initialize social icons
    if (socialIconsContainer && typeof CONFIG !== 'undefined' && CONFIG.socials) {
        socialIconsContainer.innerHTML = ''; // Clear existing icons
        CONFIG.socials.forEach(social => {
            const socialDiv = document.createElement('div');
            socialDiv.setAttribute('title', social.name);
            
            const socialLink = document.createElement('a');
            socialLink.href = social.url;
            socialLink.target = '_blank';
            socialLink.rel = 'noopener noreferrer';

            // Add specific social icon SVG (ADD YOUR SOCIAL ICONS HERE AS PER CSS COMMENT)
            // Example: For GitHub, Twitter, etc., you should add the appropriate SVG
            // For demonstration, using a placeholder img (replace with actual SVG icons)
            const socialIcon = document.createElement('img');
            socialIcon.src = social.icon || 'https://via.placeholder.com/26';
            socialIcon.alt = `${social.name} icon`;
            
            socialLink.appendChild(socialIcon);
            socialDiv.appendChild(socialLink);
            socialIconsContainer.appendChild(socialDiv);
        });
    }

    // Add event listeners for interactions
    setupEventListeners();

    // Start performance monitoring
    performanceMonitor.start();

    // Add initial particle burst at center
    const infoBox = document.querySelector('.info-box');
    if (infoBox) {
        const rect = infoBox.getBoundingClientRect();
        particleSystem.createBurst(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            20,
            '#ffd700'
        );
    }
}

// Setup event listeners for interactive effects
function setupEventListeners() {
    const socialLinks = document.querySelectorAll('.social-icons a');
    const profileImg = document.getElementById('profile-img');
    const infoBox = document.querySelector('.info-box');

    // Social icons interactions
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (audioManager.isEnabled) {
                audioManager.play('hover');
            }
            const rect = link.getBoundingClientRect();
            particleSystem.createBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                10,
                '#47cf73'
            );
        });

        link.addEventListener('click', (e) => {
            if (audioManager.isEnabled) {
                audioManager.play('click');
            }
            interactionEffects.createRipple(
                e.clientX - link.getBoundingClientRect().left,
                e.clientY - link.getBoundingClientRect().top,
                link
            );
            particleSystem.createBurst(
                e.clientX,
                e.clientY,
                15,
                '#ffd700'
            );
        });

        link.addEventListener('focus', () => {
            if (audioManager.isEnabled) {
                audioManager.play('hover');
            }
        });
    });

    // Profile image interactions
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            if (audioManager.isEnabled) {
                audioManager.play('hover');
            }
            const rect = profileImg.getBoundingClientRect();
            particleSystem.createBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2,
                12,
                '#ffd700'
            );
        });

        profileImg.addEventListener('click', (e) => {
            if (audioManager.isEnabled) {
                audioManager.play('click');
            }
            interactionEffects.createRipple(
                e.clientX - profileImg.getBoundingClientRect().left,
                e.clientY - profileImg.getBoundingClientRect().top,
                profileImg
            );
        });
    }

    // Info box mouse move for subtle particle effects
    if (infoBox) {
        infoBox.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.1) { // Throttle particle creation
                particleSystem.createParticle(e.clientX, e.clientY, '#ffd700');
            }
        });
    }

    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('social-icons') || focusedElement.tagName === 'A') {
                if (audioManager.isEnabled) {
                    audioManager.play('hover');
                }
            }
        }
    });
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEnhancedProfile();
});

// Handle visibility changes for audio context
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        audioManager.isEnabled = false;
    } else {
        audioManager.isEnabled = true;
    }
});

// Optimize performance for low-end devices
function optimizeForPerformance() {
    if (performanceMonitor.getFPS() < 30) {
        particleSystem.particles = particleSystem.particles.slice(0, Math.floor(particleSystem.particles.length / 2));
        audioManager.setVolume(0.2);
    }
}

// Check performance periodically
setInterval(optimizeForPerformance, 5000);

// Handle window errors gracefully
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.message);
    audioManager.play('notification');
    // Optionally show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.bottom = '20px';
    errorDiv.style.right = '20px';
    errorDiv.style.background = 'rgba(255, 0, 0, 0.8)';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '10px';
    errorDiv.style.borderRadius = '5px';
    errorDiv.textContent = 'An error occurred. Please refresh the page.';
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
});
