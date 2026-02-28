// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        brand: "Sony",
        price: 99.99,
        originalPrice: 149.99,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        description: "High-quality wireless headphones with noise cancellation",
        inStock: true,
        featured: true,
        tags: ["wireless", "audio", "bluetooth"]
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        brand: "Apple",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        description: "Latest smart watch with health tracking features",
        inStock: true,
        featured: true,
        tags: ["wearable", "fitness", "smart"]
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "Sports",
        brand: "Nike",
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.3,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        description: "Comfortable running shoes for professional athletes",
        inStock: true,
        featured: true,
        tags: ["footwear", "sports", "running"]
    },
    {
        id: 4,
        name: "Leather Backpack",
        category: "Fashion",
        brand: "Coach",
        price: 149.99,
        originalPrice: 199.99,
        rating: 4.6,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        description: "Premium leather backpack for everyday use",
        inStock: true,
        featured: true,
        tags: ["bags", "leather", "fashion"]
    },
    {
        id: 5,
        name: "Coffee Maker",
        category: "Home & Living",
        brand: "Keurig",
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.4,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb7f1a6c1d?w=400",
        description: "Automatic coffee maker with timer function",
        inStock: true,
        featured: true,
        tags: ["kitchen", "appliances", "coffee"]
    },
    {
        id: 6,
        name: "Yoga Mat",
        category: "Sports",
        brand: "Lululemon",
        price: 39.99,
        originalPrice: 59.99,
        rating: 4.7,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400",
        description: "Non-slip yoga mat with carrying strap",
        inStock: true,
        featured: true,
        tags: ["fitness", "yoga", "exercise"]
    },
    {
        id: 7,
        name: "Sunglasses",
        category: "Fashion",
        brand: "Ray-Ban",
        price: 129.99,
        originalPrice: 179.99,
        rating: 4.5,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
        description: "Classic aviator sunglasses with UV protection",
        inStock: true,
        featured: true,
        tags: ["eyewear", "accessories", "summer"]
    },
    {
        id: 8,
        name: "Gaming Mouse",
        category: "Electronics",
        brand: "Logitech",
        price: 49.99,
        originalPrice: 79.99,
        rating: 4.6,
        reviews: 345,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        description: "RGB gaming mouse with programmable buttons",
        inStock: true,
        featured: true,
        tags: ["gaming", "peripherals", "computer"]
    }
];

// Categories data
const categories = [
    { id: 1, name: "Electronics", icon: "💻", count: 2345, color: "#3498db" },
    { id: 2, name: "Fashion", icon: "👕", count: 4567, color: "#e74c3c" },
    { id: 3, name: "Home & Living", icon: "🏠", count: 1678, color: "#2ecc71" },
    { id: 4, name: "Sports", icon: "⚽", count: 987, color: "#f39c12" },
    { id: 5, name: "Books", icon: "📚", count: 2341, color: "#9b59b6" },
    { id: 6, name: "Toys", icon: "🎮", count: 876, color: "#e67e22" },
    { id: 7, name: "Beauty", icon: "💄", count: 1456, color: "#e84393" },
    { id: 8, name: "Automotive", icon: "🚗", count: 765, color: "#34495e" },
    { id: 9, name: "Grocery", icon: "🛒", count: 1987, color: "#27ae60" },
    { id: 10, name: "Pet Supplies", icon: "🐕", count: 654, color: "#8e44ad" }
];

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featuredProducts = products.filter(p => p.featured).slice(0, 8);
    
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load categories
function loadCategories() {
    const container = document.getElementById('categoriesGrid');
    if (!container) return;
    
    container.innerHTML = categories.map(category => `
        <div class="category-card animate-on-scroll" data-category="${category.name}">
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${category.count.toLocaleString()} items</p>
        </div>
    `).join('');
    
    // Add click event to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            window.location.href = `shop.html?category=${encodeURIComponent(category)}`;
        });
    });
}

// Create product card HTML
function createProductCard(product) {
    const discount = product.originalPrice ? 
        calculateDiscount(product.originalPrice, product.price) : 0;
    
    return `
        <div class="product-card animate-on-scroll" data-product-id="${product.id}">
            <div class="product-badges">
                ${discount > 0 ? `<span class="badge discount">-${discount}%</span>` : ''}
                ${product.featured ? '<span class="badge featured">Featured</span>' : ''}
            </div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">
                    <a href="product.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="reviews-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? 
                        `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Load products in shop page
function loadShopProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    // Get filters from URL
    const category = getQueryParam('category');
    const sort = getQueryParam('sort');
    
    let filteredProducts = [...products];
    
    if (category) {
        filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    // Apply sorting
    if (sort) {
        switch(sort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
    }
    
    container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Quick view function
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div class="quick-view">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.name}</h2>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? 
                            `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <p><strong>Brand:</strong> ${product.brand}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Availability:</strong> 
                            ${product.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Close modal
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    });
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    });
}