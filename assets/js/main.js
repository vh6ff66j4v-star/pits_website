/* ============================================================
   PULSEIQ — Main JavaScript
   ============================================================ */

/* ============================================================
   1. Dark / Light Theme Toggle
   ============================================================ */
function initThemeToggle() {
    const savedTheme = localStorage.getItem('pulseiqs-theme') || 'dark';
    applyTheme(savedTheme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('pulseiqs-theme', next);
        });
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.textContent = theme === 'dark' ? '☼' : '☽';
        btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });

    const logo = document.querySelector('.theme-name');
    if (logo) {
        // Change the source based on the theme
        logo.src = theme === 'dark' 
            ? 'assets/img/PulseIQ-dark.png' 
            : 'assets/img/PulseIQ-light.png';
    }
}

/* ============================================================
   2. Carousel — Infinite Marquee
   Duplicates the track's children so the CSS animation loops
   seamlessly: animates -50% (one full copy width).
   ============================================================ */
// function initCarousel(trackSelector) {
//     const track = document.querySelector(trackSelector);
//     if (!track) return;

//     // Clone all existing items and append — creates the seamless loop
//     const items = Array.from(track.children);
//     items.forEach(item => track.appendChild(item.cloneNode(true)));
// 

function initCarousel(trackSelector, multiplier = 3) {
    const track = document.querySelector(trackSelector);
    if (!track) return;

    const items = Array.from(track.children);
    
    // We start at 1 because the original set is already there
    for (let i = 1; i < multiplier; i++) {
        items.forEach(item => {
            track.appendChild(item.cloneNode(true));
        });
    }
}

// Call it with 3 or 4 copies
initCarousel('.skills-carousel', 4);

/* ============================================================
   3. Lightbox
   ============================================================ */
function initLightbox() {
    const modal    = document.getElementById('lightbox-modal');
    const closeBtn = document.querySelector('.lightbox-close');
    const img      = document.getElementById('lightbox-image');
    if (!modal) return;

    document.querySelectorAll('.project-card img').forEach(el => {
        el.addEventListener('click', e => {
            e.stopPropagation();
            img.src = el.getAttribute('src');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', e => { if (e.target === modal) closeLightbox(); });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.style.display === 'block') closeLightbox();
    });
}

/* ============================================================
   4. Init
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCarousel('.skills-carousel');
    initLightbox();
});