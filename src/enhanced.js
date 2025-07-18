        // Audio context for hover sounds
        let audioContext;
        let hoverSound;

        // Initialize audio
        function initAudio() {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
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
                hoverSound = () => {};
            }
        }

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
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
                    
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                    this.ctx.fill();
                    
                    this.particles.slice(index + 1).forEach(otherParticle => {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            this.ctx.beginPath();
                            this.ctx.moveTo(particle.x, particle.y);
                            this.ctx.lineTo(otherParticle.x, otherParticle.y);
                            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                            this.ctx.lineWidth = 0.5;
                            this.ctx.stroke();
                        }
                    });
                });
                
                requestAnimationFrame(() => this.animate());
            }
        }

        // Initialize everything
        function initializeProfile() {
            initAudio();
            
            // Initialize particle system
            const canvas = document.getElementById('particles-canvas');
            new ParticleSystem(canvas);
            
            // Load profile data
            const profileImg = document.getElementById('profile-img');
            const profileName = document.getElementById('profile-name');
            const profileDescription = document.getElementById('profile-description');
            const footerText = document.getElementById('footer-text');
            const socialIconsContainer = document.getElementById('social-icons');

            if (typeof CONFIG !== 'undefined' && CONFIG.profile) {
                profileImg.src = CONFIG.profile.image || "https://cdn.harys.is-a.dev/avatars/blank_profile.png";
                profileImg.onerror = () => {
                    profileImg.src = "https://cdn.harys.is-a.dev/avatars/blank_profile.png";
                };
                profileName.textContent = CONFIG.profile.name || "722: JavaScript Loading Error";
                profileDescription.innerHTML = CONFIG.profile.description || `Oops! Something went wrong. It looks like you tried to edit files but somehow messed them up. Don't worry, we'll help you get rid of it!
            <br />
            <br />
            <i>You simply need to visit <a href="https://github.com/harys722/enhanced-profile-template/blob/main/config.js">here</a> and copy the file and update your config.js or look for other files.</i>
            <br />
            <br />
            <i>If you are still unsure, feel free to open an issue for help.</i>`;
                footerText.innerHTML = CONFIG.profile.footer || "Oops! Something went wrong. Please make sure you have configured it correctly.";
            } else {
                console.error('CONFIG object not found or profile data missing');
                profileImg.src = "https://cdn.harys.is-a.dev/avatars/blank_profile.png";
                profileName.textContent = "722: JavaScript Loading Error";
                profileDescription.innerHTML = `Oops! Something went wrong. It looks like you tried to edit files but somehow messed them up. Don't worry, we'll help you get rid of it!
            <br />
            <br />
            <i>You simply need to visit <a href="https://github.com/harys722/enhanced-profile-template/blob/main/config.js">here</a> and copy the file and update your config.js or look for other files.</i>
            <br />
            <br />
            <i>If you are still unsure, feel free to open an issue for help.</i>`;
                footerText.innerHTML = "Oops! Something went wrong. Please make sure you have configured it correctly.";
            }
            
            // Load social icons
            if (typeof CONFIG !== 'undefined' && CONFIG.socials && typeof SOCIAL_ICONS !== 'undefined') {
                Object.keys(CONFIG.socials).forEach(platform => {
                    if (CONFIG.socials[platform].enabled && SOCIAL_ICONS[platform]) {
                        const socialDiv = document.createElement('div');
                        socialDiv.className = platform;
                        socialDiv.title = CONFIG.socials[platform].title;
                        
                        const link = document.createElement('a');
                        link.href = CONFIG.socials[platform].url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        
                        const img = document.createElement('img');
                        img.src = SOCIAL_ICONS[platform];
                        img.alt = `${CONFIG.socials[platform].title} icon`;
                        img.onerror = () => {
                            img.src = 'https://via.placeholder.com/26';
                        };
                        
                        socialDiv.addEventListener('mouseenter', function() {
                            if (hoverSound) {
                                try {
                                    hoverSound();
                                } catch (error) {
                                    console.error('Audio playback failed:', error);
                                }
                            }
                        });
                        
                        link.appendChild(img);
                        socialDiv.appendChild(link);
                        socialIconsContainer.appendChild(socialDiv);
                    }
                });
            } else {
                console.error('CONFIG.socials or SOCIAL_ICONS not found');
            }
            
            // Add ripple effect to social icons
            document.querySelectorAll('.social-icons a').forEach(link => {
                link.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.background = 'rgba(255, 215, 0, 0.4)';
                    ripple.style.transform = 'scale(0)';
                    ripple.style.pointerEvents = 'none';
                    this.appendChild(ripple);
                    
                    const rect = this.getBoundingClientRect();
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

            // Add hover sound to profile image
            profileImg.addEventListener('mouseenter', () => {
                if (hoverSound) {
                    try {
                        hoverSound();
                    } catch (error) {
                        console.error('Audio playback failed:', error);
                    }
                }
            });
        }

        // Ensure script runs after config.js is loaded
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            initializeProfile();
        } else {
            window.addEventListener('DOMContentLoaded', initializeProfile);
        }
