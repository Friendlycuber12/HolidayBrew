// Order Success Page JavaScript

function loadOrderDetails() {
    // Get the latest order from localStorage
    const orders = JSON.parse(localStorage.getItem('holidayBrewOrders') || '[]');
    
    if (orders.length === 0) {
        // No orders found, redirect to home
        window.location.href = 'index.html';
        return;
    }
    
    // Get the most recent order
    const order = orders[orders.length - 1];
    
    // Display Order ID
    document.getElementById('order-id').textContent = order.orderId;
    
    // Display Order Items
    const itemsContainer = document.getElementById('order-items');
    itemsContainer.innerHTML = order.items.map(item => `
        <div class="flex justify-between items-center text-sm">
            <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg">
                <div class="text-left">
                    <p class="font-medium text-coffee-900">${item.name}</p>
                    <p class="text-xs text-coffee-700">Qty: ${item.quantity} × ₹${item.price.toFixed(2)}</p>
                </div>
            </div>
            <span class="font-bold text-festive-gold">₹${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Display Order Summary
    document.getElementById('summary-subtotal').textContent = `₹${order.summary.subtotal.toFixed(2)}`;
    document.getElementById('summary-shipping').textContent = `₹${order.summary.shipping.toFixed(2)}`;
    document.getElementById('summary-tax').textContent = `₹${order.summary.tax.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `₹${order.summary.total.toFixed(2)}`;
    
    // Display Customer Info
    document.getElementById('customer-email').textContent = order.customer.email;
    
    // Display Order Date
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('order-date').textContent = formattedDate;
}

// Snow effect
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

// Confetti effect (optional celebration)
function celebrateOrder() {
    // Simple celebration effect
    const celebration = document.createElement('div');
    celebration.className = 'fixed inset-0 pointer-events-none z-40';
    celebration.innerHTML = `
        <div class="absolute top-1/4 left-1/4 text-6xl animate-float">🎉</div>
        <div class="absolute top-1/3 right-1/4 text-5xl animate-float" style="animation-delay: 0.5s">☕</div>
        <div class="absolute top-1/2 left-1/3 text-4xl animate-float" style="animation-delay: 1s">🎄</div>
    `;
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createSnowEffect();
    loadOrderDetails();
    celebrateOrder();
    
    console.log('🎉 Order confirmed successfully!');
});