// Holiday Brew - Main JavaScript (FIXED)

// ============================================
// 1. SNOW EFFECT
// ============================================
function createSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    if (!snowContainer) return;
    
    const snowflakeChars = ['❄', '❅', '❆'];
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        
        // Random properties
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 0.5 + 0.5) + 'em';
        snowflake.style.opacity = Math.random() * 0.6 + 0.3;
        snowflake.style.animationDuration = (Math.random() * 10 + 10) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        
        snowContainer.appendChild(snowflake);
    }
}

// ============================================
// 2. NAVBAR SCROLL EFFECT
// ============================================
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// 3. MOBILE MENU TOGGLE
// ============================================
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.className = 'ph ph-x text-3xl';
        } else {
            icon.className = 'ph ph-list text-3xl';
        }
    });

    // Close menu when link is clicked
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
// 4. REVEAL ON SCROLL ANIMATION
// ============================================
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ============================================
// 5. PRODUCTS GRID DYNAMIC CONTENT
// ============================================
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) {
        console.log('Products grid not found on this page');
        return;
    }
    
    const products = [
        {
            id: 1,
            name: 'Espresso Deluxe',
            price: 349,
            image: 'https://images.unsplash.com/photo-1532003955843-63df21692c76?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXNwcmVzc3NvfGVufDB8fDB8fHww',
            description: 'Rich, bold espresso blend',
            tag: 'Bestseller'
        },
        {
            id: 2,
            name: 'Holiday Blend',
            price: 419,
            image: 'https://media.istockphoto.com/id/2237399076/photo/warm-spiced-beverage-with-whipped-cream-and-garnishes-in-cozy-setting.webp?a=1&b=1&s=612x612&w=0&k=20&c=aDVoqEtVV0WlHNlaGkOxPER2D-oJKqKJMcvpH12SRlw=',
            description: 'Seasonal cinnamon blend',
            tag: 'New'
        },
        {
            id: 3,
            name: 'French Press Kit',
            price: 2599,
            image: 'https://images.pexels.com/photos/13737043/pexels-photo-13737043.jpeg',
            description: 'Complete brewing kit',
            tag: 'Gift Set'
        },
        {
            id: 4,
            name: 'Cold Brew Bottle',
            price: 999,
            image: 'https://images.pexels.com/photos/2873623/pexels-photo-2873623.jpeg',
            description: 'Smooth cold brew',
            tag: 'Popular'
        },
        {
            id: 5,
            name: 'Ceramic Mug Set',
            price: 2999,
            image: 'https://images.pexels.com/photos/5461619/pexels-photo-5461619.jpeg',
            description: 'Set of 4 mugs',
            tag: 'Limited'
        },
        {
            id: 6,
            name: 'Coffee Grinder',
            price: 4499,
            image: 'https://images.unsplash.com/photo-1637320503473-c9f6d46a3b1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvZmZlZSUyMGdyaW5kZXJ8ZW58MHx8MHx8fDA%3D',
            description: 'Professional grinder',
            tag: 'Pro'
        }
    ];
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group';
        
        productCard.innerHTML = `
            <div class="relative overflow-hidden h-40">
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute top-2 right-2 bg-festive-red text-white text-xs px-2 py-1 rounded-full font-bold">
                    ${product.tag}
                </div>
            </div>
            <div class="p-3">
                <h4 class="font-serif text-base text-coffee-900 mb-1 group-hover:text-festive-red transition-colors">
                    ${product.name}
                </h4>
                <p class="text-xs text-coffee-700 mb-2">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-festive-gold font-bold text-sm">₹${product.price.toFixed(2)}</span>
                    <button onclick="addToCartFromHome(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}', '${product.description.replace(/'/g, "\\'")}')" 
                            class="text-festive-green hover:text-festive-red transition-colors" title="Add to cart">
                        <i class="ph-fill ph-shopping-cart text-lg"></i>
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    console.log('✓ Products loaded:', products.length);
}

// ============================================
// 6. ADD TO CART FROM HOME PAGE
// ============================================
function addToCartFromHome(id, name, price, image, description) {
    const cart = JSON.parse(localStorage.getItem('holidayBrewCart') || '[]');
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            description: description,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('holidayBrewCart', JSON.stringify(cart));
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-28 right-6 bg-festive-green text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-fade-in-up';
    notification.innerHTML = `
        <i class="ph-fill ph-check-circle text-2xl"></i>
        <span class="font-medium">${name} added to cart!</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    updateCartBadge();
}

// ============================================
// 7. LOGOUT HANDLER (FIXED - GLOBAL)
// ============================================
function handleLogout() {
    console.log('Logout triggered');
    localStorage.removeItem('holidayBrewUser');
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-28 right-6 bg-festive-green text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3';
    notification.innerHTML = `
        <i class="ph-fill ph-check-circle text-2xl"></i>
        <span class="font-medium">Logged out successfully</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        window.location.href = '/login';
    }, 1000);
}

// ============================================
// 8. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// 9. VIDEO FALLBACK
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
// 10. CART BADGE UPDATE
// ============================================
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('holidayBrewCart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const badge = document.getElementById('cart-badge');
    const badgeMobile = document.getElementById('cart-badge-mobile');
    
    if (totalItems > 0) {
        if (badge) {
            badge.textContent = totalItems;
            badge.classList.remove('hidden');
        }
        if (badgeMobile) {
            badgeMobile.textContent = totalItems;
            badgeMobile.classList.remove('hidden');
        }
    } else {
        if (badge) badge.classList.add('hidden');
        if (badgeMobile) badgeMobile.classList.add('hidden');
    }
}

// ============================================
// 11. USER MENU UPDATE (FIXED)
// ============================================
function updateUserMenu() {
    const raw = localStorage.getItem('holidayBrewUser');
    const userMenu = document.getElementById('user-menu');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (!raw || !userMenu) return;

    try {
        const user = JSON.parse(raw);
        
        // Update user menu if user is logged in
        if (user?.loggedIn && user?.email) {
            userMenu.innerHTML = '<i class="ph-fill ph-user-circle text-2xl"></i>';
            userMenu.title = `Logged in as ${user.name || user.email}`;
            
            // Show logout button
            if (logoutBtn) {
                logoutBtn.classList.remove('hidden');
                logoutBtn.classList.add('flex');
            }
        } else {
            // User not logged in, show login link
            userMenu.innerHTML = '<i class="ph ph-user text-2xl"></i>';
            userMenu.title = 'Login';
            
            if (logoutBtn) {
                logoutBtn.classList.add('hidden');
                logoutBtn.classList.remove('flex');
            }
        }
    } catch (error) {
        console.error('Error updating user menu:', error);
        localStorage.removeItem('holidayBrewUser');
        
        // Reset to login state
        userMenu.innerHTML = '<i class="ph ph-user text-2xl"></i>';
        if (logoutBtn) {
            logoutBtn.classList.add('hidden');
            logoutBtn.classList.remove('flex');
        }
    }
}

// ============================================
// 12. PAGE VISIBILITY (Pause videos when tab hidden)
// ============================================
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

// ============================================
// 13. INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎄 Initializing Holiday Brew...');
    
    createSnowEffect();
    handleNavbarScroll();
    setupMobileMenu();
    setupScrollReveal();
    loadProducts();
    setupSmoothScroll();
    setupVideoFallback();
    updateCartBadge();
    updateUserMenu();
    
    // Update cart badge when storage changes
    window.addEventListener('storage', updateCartBadge);
    
    console.log('✓ Holiday Brew initialized successfully!');
});

// ============================================
// 14. MAKE GLOBAL FUNCTIONS AVAILABLE
// ============================================
window.addToCartFromHome = addToCartFromHome;
window.handleLogout = handleLogout;