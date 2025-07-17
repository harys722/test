// Social Media Icons Image URLs
const SOCIAL_ICONS = {
    github: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg",
    gitlab: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/gitlab.svg",
    discord: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/discord.svg",
    reddit: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/reddit.svg",
    email: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/gmail.svg",
    website: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/website.svg",
    bitbucket: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/bitbucket.svg",
    codepen: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/codepen.svg",
    replit: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/replit.svg",
    stackoverflow: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/stackoverflow.svg",
    telegram: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/telegram.svg",
    whatsapp: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/whatsapp.svg",
    signal: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/signal.svg",
    skype: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/skype.svg",
    twitter: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/twitter.svg",
    facebook: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/facebook.svg",
    instagram: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/instagram.svg",
    tiktok: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tiktok.svg",
    snapchat: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/snapchat.svg",
    mastodon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mastodon.svg",
    bluesky: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/bluesky.svg",
    threads: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/threads.svg",
    linkedin: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg",
    behance: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/behance.svg",
    dribbble: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/dribbble.svg",
    upwork: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/upwork.svg",
    fiverr: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/fiverr.svg",
    youtube: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/youtube.svg",
    twitch: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/twitch.svg",
    medium: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/medium.svg",
    devto: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/devdotto.svg",
    hashnode: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hashnode.svg",
    substack: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/substack.svg",
    steam: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/steam.svg",
    epicgames: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/epicgames.svg",
    xbox: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/xbox.svg",
    playstation: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/playstation.svg",
    spotify: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/spotify.svg",
    soundcloud: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/soundcloud.svg",
    applemusic: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/applemusic.svg",
    bandcamp: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/bandcamp.svg",
    pinterest: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/pinterest.svg",
    tumblr: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tumblr.svg",
    flickr: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/flickr.svg",
    vimeo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/vimeo.svg",
    patreon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/patreon.svg",
    kofi: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/kofi.svg",
    buymeacoffee: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/buymeacoffee.svg"
};

// Populate profile information
document.getElementById('profile-img').src = CONFIG.profile.image;
document.getElementById('profile-name').textContent = CONFIG.profile.name;
document.getElementById('profile-description').innerHTML = CONFIG.profile.description;

// Populate social media icons
const socialIconsContainer = document.getElementById('social-icons');

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
        img.style.width = '24px';
        img.style.height = '24px';

        link.appendChild(img);
        socialDiv.appendChild(link);
        socialIconsContainer.appendChild(socialDiv);
    }
});

// Add ripple effect on click
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
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
