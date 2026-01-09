// ============================================
// 1. SNOW EFFECT
// ============================================
function createSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeChars = ['❅', '❆', '❄'];
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

const allProducts = [
    // Coffee Beans
    {
        id: 1,
        name: 'Espresso Deluxe',
        price: 349,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1532003955843-63df21692c76?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXNwcmVzc3NvfGVufDB8fDB8fHww',
        description: 'Rich, bold espresso blend with chocolate notes',
        tag: 'Bestseller',
        rating: 4.8,
        inStock: true
    },
    {
        id: 2,
        name: 'Holiday Blend',
        price: 419,
        category: 'coffee',
        image: 'https://media.istockphoto.com/id/2237399076/photo/warm-spiced-beverage-with-whipped-cream-and-garnishes-in-cozy-setting.webp?a=1&b=1&s=612x612&w=0&k=20&c=aDVoqEtVV0WlHNlaGkOxPER2D-oJKqKJMcvpH12SRlw=',
        description: 'Seasonal blend with cinnamon and nutmeg',
        tag: 'New',
        rating: 4.9,
        inStock: true
    },
    {
        id: 3,
        name: 'Ethiopian Single Origin',
        price: 449,
        category: 'coffee',
        image: 'https://images.pexels.com/photos/1660916/pexels-photo-1660916.jpeg',
        description: 'Fruity and floral with bright acidity',
        tag: 'Premium',
        rating: 4.7,
        inStock: true
    },
    {
        id: 4,
        name: 'Dark Roast Supremo',
        price: 229,
        category: 'coffee',
        image: 'https://images.pexels.com/photos/18128093/pexels-photo-18128093.jpeg',
        description: 'Strong, smoky flavor for dark roast lovers',
        tag: 'Popular',
        rating: 4.6,
        inStock: true
    },
    {
        id: 5,
        name: 'Medium Roast Classic',
        price: 299,
        category: 'coffee',
        image: 'https://images.pexels.com/photos/14356266/pexels-photo-14356266.jpeg',
        description: 'Balanced and smooth everyday coffee',
        tag: 'Classic',
        rating: 4.5,
        inStock: true
    },
    {
        id: 6,
        name: 'Decaf Delight',
        price: 319,
        category: 'coffee',
        image: 'https://images.pexels.com/photos/35346130/pexels-photo-35346130.jpeg',
        description: 'Full flavor without the caffeine',
        tag: 'Decaf',
        rating: 4.4,
        inStock: true
    },

    // Ready to Drink
    {
        id: 7,
        name: 'Cold Brew Bottle',
        price: 999,
        category: 'drinks',
        image: 'https://images.pexels.com/photos/2873623/pexels-photo-2873623.jpeg',
        description: 'Smooth cold brew, ready to enjoy',
        tag: 'Chilled',
        rating: 4.7,
        inStock: true
    },
    {
        id: 8,
        name: 'Peppermint Mocha RTD',
        price: 549,
        category: 'drinks',
        image: 'https://images.pexels.com/photos/15023071/pexels-photo-15023071.jpeg',
        description: 'Festive peppermint mocha in a bottle',
        tag: 'Holiday',
        rating: 4.8,
        inStock: true
    },
    {
        id: 9,
        name: 'Vanilla Latte Can',
        price: 379,
        category: 'drinks',
        image: 'https://images.pexels.com/photos/3151766/pexels-photo-3151766.jpeg',
        description: 'Creamy vanilla latte on the go',
        tag: 'Popular',
        rating: 4.6,
        inStock: true
    },
    {
        id: 10,
        name: 'Nitro Cold Brew',
        price: 289,
        category: 'drinks',
        image: 'https://images.pexels.com/photos/30714539/pexels-photo-30714539.jpeg',
        description: 'Nitrogen-infused for extra smoothness',
        tag: 'Premium',
        rating: 4.9,
        inStock: true
    },

    // Equipment
    {
        id: 11,
        name: 'French Press Kit',
        price: 2599,
        category: 'equipment',
        image: 'https://images.pexels.com/photos/13737043/pexels-photo-13737043.jpeg',
        description: 'Complete brewing kit with instructions',
        tag: 'Essential',
        rating: 4.7,
        inStock: true
    },
    {
        id: 12,
        name: 'Coffee Grinder',
        price: 4499 ,
        category: 'equipment',
        image: 'https://images.unsplash.com/photo-1637320503473-c9f6d46a3b1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvZmZlZSUyMGdyaW5kZXJ8ZW58MHx8MHx8fDA%3D',
        description: 'Burr grinder for perfect consistency',
        tag: 'Pro',
        rating: 4.8,
        inStock: true
    },
    {
        id: 13,
        name: 'Pour Over Set',
        price: 1999,
        category: 'equipment',
        image: 'https://images.pexels.com/photos/16284358/pexels-photo-16284358.jpeg',
        description: 'Elegant pour-over brewing system',
        tag: 'Artisan',
        rating: 4.6,
        inStock: true
    },
    {
        id: 14,
        name: 'Electric Milk Frother',
        price: 1599,
        category: 'equipment',
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSG9XFBbuktG_5wZbAV8pkff2JxnsRlKrk0jdORpuDXBUiyTaeBxr03HDe4noWPUQA-0FUhLCICanaM5ZA9HdIc95WgBEU7FC3FVXeVCWZreldbOr8Lgh_5',
        description: 'Create café-quality foam at home',
        tag: 'Popular',
        rating: 4.5,
        inStock: true
    },
    {
        id: 15,
        name: 'Coffee Scale',
        price: 1499,
        category: 'equipment',
        image: 'data:image/jpeg;base64,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',
        description: 'Precision weighing for perfect ratios',
        tag: 'Essential',
        rating: 4.7,
        inStock: true
    },

    // Gift Sets
    {
        id: 16,
        name: 'Ceramic Mug Set',
        price: 2999,
        category: 'gifts',
        image: 'https://images.pexels.com/photos/5461619/pexels-photo-5461619.jpeg',
        description: 'Set of 4 handcrafted ceramic mugs',
        tag: 'Limited',
        rating: 4.8,
        inStock: true
    },
    {
        id: 17,
        name: 'Holiday Gift Box',
        price: 4999,
        category: 'gifts',
        image: '/static/images/giftbox.png',
        description: 'Curated selection of our best blends',
        tag: 'Gift',
        rating: 4.9,
        inStock: true
    },
    {
        id: 18,
        name: 'Barista Starter Kit',
        price: 7999,
        category: 'gifts',
        image: '/static/images/kit.png',
        description: 'Everything needed to brew like a pro',
        tag: 'Complete',
        rating: 4.9,
        inStock: true
    },
    {
        id: 19,
        name: 'Travel Coffee Set',
        price: 3499,
        category: 'gifts',
        image: '/static/images/travel.png',
        description: 'Portable brewing for coffee lovers',
        tag: 'Travel',
        rating: 4.6,
        inStock: true
    },
    {
        id: 20,
        name: 'Coffee Subscription Box',
        price: 1599,
        category: 'gifts',
        image: '/static/images/subscription.png',
        description: 'Monthly delivery of exclusive blends',
        tag: 'Monthly',
        rating: 4.8,
        inStock: true
    }
];

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20">
                <i class="ph ph-coffee text-6xl text-coffee-900/20 mb-4"></i>
                <p class="text-coffee-700 text-lg">No products found in this category</p>
            </div>
        `;
        return;
    }

    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 opacity-0';
        card.style.animationDelay = `${index * 50}ms`;
        
        card.innerHTML = `
            <div class="relative overflow-hidden h-64 bg-coffee-100">
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                     loading="lazy">
                <div class="absolute top-3 right-3 bg-festive-red text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                    ${product.tag}
                </div>
                ${!product.inStock ? '<div class="absolute inset-0 bg-black/60 flex items-center justify-center"><span class="text-white font-bold text-lg">Out of Stock</span></div>' : ''}
            </div>
            <div class="p-5">
                <h3 class="font-serif text-xl text-coffee-900 mb-2 hover:text-festive-red transition-colors">
                    ${product.name}
                </h3>
                <p class="text-coffee-700 text-sm mb-3 line-clamp-2">
                    ${product.description}
                </p>
                <div class="flex items-center gap-1 mb-3">
                    ${generateStars(product.rating)}
                    <span class="text-xs text-coffee-700 ml-1">(${product.rating})</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-festive-gold">₹${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" 
                            class="px-5 py-2 bg-festive-red text-white rounded-lg font-medium text-sm hover:bg-festive-green transition-all duration-300 hover:shadow-lg flex items-center gap-2 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${!product.inStock ? 'disabled' : ''}>
                        <i class="ph-fill ph-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
        
        // Trigger animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 10);
    });
}

// ============================================
// GENERATE STAR RATING
// ============================================
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="ph-fill ph-star text-festive-gold text-sm"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="ph-fill ph-star-half text-festive-gold text-sm"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="ph ph-star text-festive-gold text-sm"></i>';
    }
    
    return stars;
}

// ============================================
// FILTER FUNCTIONALITY
// ============================================
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-festive-red', 'text-white');
                b.classList.add('bg-white', 'text-coffee-900', 'hover:bg-festive-gold/10');
            });
            
            btn.classList.add('active', 'bg-festive-red', 'text-white');
            btn.classList.remove('bg-white', 'text-coffee-900', 'hover:bg-festive-gold/10');
            
            // Filter products
            const category = btn.dataset.category;
            const filteredProducts = category === 'all' 
                ? allProducts 
                : allProducts.filter(p => p.category === category);
            
            renderProducts(filteredProducts);
        });
    });
}

// ============================================
// ADD TO CART
// ============================================
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('holidayBrewCart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('holidayBrewCart', JSON.stringify(cart));
    
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
    
    // Update cart badge if it exists
    updateCartBadge();
}

// Update cart badge count
// function updateCartBadge() {
//     const cart = JSON.parse(localStorage.getItem('holidayBrewCart') || '[]');
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
//     // You can add a badge to the cart icon in navigation if needed
//     console.log('Cart total items:', totalItems);
// }

// ============================================
// NOTIFICATION
// ============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-28 right-6 bg-festive-green text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-fade-in-up flex items-center gap-3';
    notification.innerHTML = `
        <i class="ph-fill ph-check-circle text-2xl"></i>
        <span class="font-medium">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

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
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial render with all products
    renderProducts(allProducts);
    
    // Setup filters
    setupFilters();
    
    // Mobile menu
    setupMobileMenu();
    
    // Snow effect
    createSnowEffect();
    
    // Update cart badge
    updateCartBadge();
    
    // Set initial active filter button
    const allButton = document.querySelector('.filter-btn[data-category="all"]');
    if (allButton) {
        allButton.classList.add('bg-festive-red', 'text-white');
        allButton.classList.remove('bg-white', 'text-coffee-900');
    }
    
    console.log('☕ Coffee page loaded with', allProducts.length, 'products');
});