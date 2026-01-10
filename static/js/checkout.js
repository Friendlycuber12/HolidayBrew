// Checkout Page JavaScript

let cart = [];
let checkoutSummary = {
    subtotal: 0,
    shipping: 50,
    tax: 0,
    total: 0
};

// Load cart and display summary
function loadCheckoutData() {
    cart = JSON.parse(localStorage.getItem('holidayBrewCart') || '[]');
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        setTimeout(() => {
            window.location.href = 'coffee.html';
        }, 2000);
        return;
    }
    
    displayOrderItems();
    updateCheckoutSummary();
}

// Display order items
function displayOrderItems() {
    const container = document.getElementById('checkout-items');
    
    container.innerHTML = cart.map(item => `
        <div class="flex gap-3 pb-3 border-b border-coffee-100">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
            <div class="flex-1">
                <h4 class="font-medium text-coffee-900 text-sm">${item.name}</h4>
                <p class="text-xs text-coffee-700">Qty: ${item.quantity}</p>
                <p class="font-bold text-festive-gold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Update checkout summary
function updateCheckoutSummary() {
    // Calculate subtotal (prices are in rupees as whole numbers)
    checkoutSummary.subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutSummary.shipping = 50; // ₹50 shipping
    checkoutSummary.tax = Math.round(checkoutSummary.subtotal * 0.10); // 10% tax, rounded
    checkoutSummary.total = checkoutSummary.subtotal + checkoutSummary.shipping + checkoutSummary.tax;
    
    // Display as whole rupees (no decimals needed)
    document.getElementById('checkout-subtotal').textContent = `₹${checkoutSummary.subtotal}`;
    document.getElementById('checkout-shipping').textContent = `₹${checkoutSummary.shipping}`;
    document.getElementById('checkout-tax').textContent = `₹${checkoutSummary.tax}`;
    document.getElementById('checkout-total').textContent = `₹${checkoutSummary.total}`;
}

// Place Order
function placeOrder() {
    console.log('Place Order clicked!'); // Debug log
    
    // Validate form
    const requiredInputs = document.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-festive-red');
        } else {
            input.classList.remove('border-festive-red');
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Get the button
    const btn = document.getElementById('place-order-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-spinner text-xl animate-spin"></i> Processing Order...';
    btn.disabled = true;
    
    console.log('Creating order...'); // Debug log
    
    // Simulate order processing
    setTimeout(() => {
        // Generate order ID
        const orderId = 'HB' + Date.now().toString().slice(-8);
        
        // Get form data
        const firstName = document.querySelector('input[type="text"]').value || 'Guest';
        const emailInput = document.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value : 'guest@holidaybrew.com';
        
        console.log('Order details:', { orderId, email, items: cart.length }); // Debug log
        
        // Create order
        const order = {
            orderId: orderId,
            items: cart,
            summary: checkoutSummary,
            customer: {
                email: email,
                name: firstName
            },
            date: new Date().toISOString(),
            status: 'confirmed'
        };
        
        // Save order
        const orders = JSON.parse(localStorage.getItem('holidayBrewOrders') || '[]');
        orders.push(order);
        localStorage.setItem('holidayBrewOrders', JSON.stringify(orders));
        
        console.log('Order saved! Redirecting...'); // Debug log
        
        // Clear cart and summary
        localStorage.removeItem('holidayBrewCart');
        localStorage.removeItem('holidayBrewCartSummary');
        
        // Redirect to success page
        window.location.href = '/order_success';
        
    }, 2000);
}

// Setup place order button
function setupPlaceOrderButton() {
    const btn = document.getElementById('place-order-btn');
    if (btn) {
        btn.addEventListener('click', placeOrder);
        console.log('Place order button connected!'); // Debug log
    } else {
        console.error('Place order button not found!');
    }
}

// Show order success modal
function showOrderSuccess(orderId) {
    const order = JSON.parse(localStorage.getItem('holidayBrewOrders') || '[]').slice(-1)[0];
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fade-in-up">
            <div class="w-20 h-20 bg-festive-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="ph-fill ph-check-circle text-5xl text-festive-green"></i>
            </div>
            <h2 class="font-serif text-3xl text-coffee-900 mb-2">Order Confirmed!</h2>
            <p class="text-coffee-700 mb-4">Thank you for your purchase</p>
            
            <div class="bg-festive-cream rounded-lg p-4 mb-4">
                <p class="text-sm text-coffee-700 mb-1">Order ID</p>
                <p class="font-bold text-xl text-festive-gold mb-3">${orderId}</p>
                <div class="text-left text-sm space-y-1 border-t border-coffee-100 pt-3">
                    <div class="flex justify-between">
                        <span class="text-coffee-700">Items:</span>
                        <span class="font-medium">${order.items.length}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-coffee-700">Total:</span>
                        <span class="font-bold text-festive-gold">${order.summary.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <p class="text-sm text-coffee-700 mb-6">
                We've sent a confirmation email to <strong>${order.customer.email}</strong>. 
                Your delicious coffee will be delivered soon! ☕
            </p>
            
            <button 
                onclick="window.location.href='index.html'"
                class="w-full bg-festive-green text-white font-medium py-3 rounded-lg hover:bg-festive-gold transition-all mb-2">
                Back to Home
            </button>
            <button 
                onclick="window.location.href='coffee.html'"
                class="w-full text-festive-red hover:text-festive-gold transition-colors text-sm font-medium">
                Continue Shopping
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Handle payment method change
function setupPaymentMethodToggle() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('card-details');
    
    // Hide card details initially if not card payment
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (selectedPayment && selectedPayment.value !== 'card') {
        cardDetails.style.display = 'none';
    }
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

// Format card number input
function setupCardFormatting() {
    const cardNumberInput = document.querySelector('input[placeholder*="1234"]');
    if (!cardNumberInput) return;
    
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Format expiry date input
function setupExpiryFormatting() {
    const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
    if (!expiryInput) return;
    
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-festive-green' : 'bg-festive-red';
    notification.className = `fixed top-28 right-6 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3`;
    notification.innerHTML = `
        <i class="ph-fill ph-${type === 'success' ? 'check' : 'warning'}-circle text-2xl"></i>
        <span class="font-medium">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createSnowEffect();
    loadCheckoutData();
    setupPaymentMethodToggle();
    setupCardFormatting();
    setupExpiryFormatting();
    setupPlaceOrderButton(); // Add this line!
    
    console.log('💳 Checkout page initialized');
    console.log('Cart:', cart);
    console.log('Summary:', checkoutSummary);
});