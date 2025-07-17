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
