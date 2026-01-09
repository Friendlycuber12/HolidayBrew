// Events Page JavaScript

// ============================================
// MOBILE MENU
// ============================================
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.className = 'ph ph-x text-3xl';
        } else {
            icon.className = 'ph ph-list text-3xl';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'ph ph-list text-3xl';
        });
    });
}

// ============================================
// SNOW EFFECT
// ============================================
function createSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;
    
    const snowflakeChars = ['❅', '❆', '❄'];
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 0.5 + 0.5) + 'em';
        snowflake.style.opacity = Math.random() * 0.6 + 0.3;
        snowflake.style.animationDuration = (Math.random() * 10 + 10) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        
        snowContainer.appendChild(snowflake);
    }
}

// ============================================
// NOTIFICATION FORM
// ============================================
function setupNotificationForm() {
    const form = document.getElementById('notify-form');
    const message = document.getElementById('form-message');

    if (!form || !message) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Show success message
        message.textContent = '✓ Thanks! We\'ll notify you when events are announced.';
        message.style.opacity = '1';
        
        // Clear form
        emailInput.value = '';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            message.style.opacity = '0';
        }, 5000);

        // In a real application, you would send this to a server
        console.log('Email subscribed:', email);
    });
}

// ============================================
// VIDEO FALLBACK
// ============================================
function setupVideoFallback() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'absolute inset-0 bg-coffee-900';
            this.parentElement.appendChild(fallback);
        });
    });
}

// ============================================
// PAGE VISIBILITY (Pause video when tab hidden)
// ============================================
function setupPageVisibility() {
    document.addEventListener('visibilitychange', () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (document.hidden) {
                video.pause();
            } else {
                video.play();
            }
        });
    });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    createSnowEffect();
    setupNotificationForm();
    setupVideoFallback();
    setupPageVisibility();
    
    console.log('🎁 Events page loaded - Coming Soon!');
});