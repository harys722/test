// Particle system
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init(); // Reinitialize particles on resize
    }

    init() {
        this.particles = [];
        const numParticles = Math.min(Math.floor((this.canvas.width * this.canvas.height) / 15000), 100);
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce on edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();

            // Draw lines between close particles
            this.particles.slice(index + 1).forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        requestAnimationFrame(() => this.animate());
    }
}

// Function to initialize profile after fetching config.json
function initializeProfile(data) {
    // Initialize particle system
    const canvas = document.getElementById('particles-canvas');
    new ParticleSystem(canvas);

    // Setup profile elements
    const profileImg = document.getElementById('profile-img');
    const profileName = document.getElementById('profile-name');
    const profileDescription = document.getElementById('profile-description');
    const footerText = document.getElementById('footer-text');

    // Populate profile info
    if (data.profile) {
        profileImg.src = data.profile.image || "https://cdn.harys.is-a.dev/avatars/blank_profile.png";
        profileImg.onerror = () => {
            profileImg.src = "https://cdn.harys.is-a.dev/avatars/blank_profile.png";
        };
        profileName.textContent = data.profile.name || "Name not provided";
        profileDescription.innerHTML = data.profile.description || `Default description.`;
        footerText.innerHTML = data.profile.footer || "";
    } else {
        console.error('Profile data missing in config.json');
        // Fallback
        profileImg.src = "https://cdn.harys.is-a.dev/avatars/blank_profile.png";
        profileName.textContent = "722: JavaScript Loading Error";
        profileDescription.innerHTML = `Oops! Something went wrong.`;
        footerText.innerHTML = "Oops! Something went wrong.";
    }

    // Populate social icons
    if (data.socials && window.SOCIAL_ICONS) {
        Object.keys(data.socials).forEach(platform => {
            const socialData = data.socials[platform];
            if (socialData.enabled && SOCIAL_ICONS[platform]) {
                const socialDiv = document.createElement('div');
                socialDiv.className = platform;
                socialDiv.title = socialData.title;

                const link = document.createElement('a');
                link.href = socialData.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';

                const img = document.createElement('img');
                img.src = SOCIAL_ICONS[platform];
                img.alt = `${socialData.title} icon`;
                img.onerror = () => {
                    img.src = 'https://cdn.harys.is-a.dev/avatars/unknown_profile.png';
                };

                // Hover sound
                socialDiv.addEventListener('mouseenter', () => {
                    if (typeof window.getHoverSound === 'function') {
                        try {
                            const soundFn = window.getHoverSound();
                            if (typeof soundFn === 'function') {
                                soundFn();
                            }
                        } catch (err) {
                            console.error('Hover sound error:', err);
                        }
                    }
                });

                link.appendChild(img);
                socialDiv.appendChild(link);
                document.getElementById('social-icons').appendChild(socialDiv);
            }
        });
    }

    // Ripple effect on social icons
    document.querySelectorAll('.social-icons a').forEach(link => {
        link.addEventListener('click', e => {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 215, 0, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.pointerEvents = 'none';
            link.appendChild(ripple);

            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            ripple.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(2)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            });

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Profile image hover sound
    document.getElementById('profile-img').addEventListener('mouseenter', () => {
        if (typeof window.getHoverSound === 'function') {
            try {
                const soundFn = window.getHoverSound();
                if (typeof soundFn === 'function') {
                    soundFn();
                }
            } catch (err) {
                console.error('Hover sound error:', err);
            }
        }
    });
}

// Load config.json and initialize
fetch('config.json')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => {
    console.log('Config data:', data);
    initializeProfile(data);
  })
  .catch(error => {
    console.error('Error loading config:', error);
    // Initialize with defaults if fetch fails
    initializeProfile({});
  });

// Ensure DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Already handled by fetch promise
    });
}
