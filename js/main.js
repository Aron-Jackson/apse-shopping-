// Main JavaScript file

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const newsletterForm = document.getElementById('newsletterForm');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load dynamic content
    loadCategories();
    loadFeaturedProducts();
    loadShopProducts();
    
    // Initialize components
    initMobileMenu();
    initScrollEffects();
    initSearch();
    initNewsletter();
    initTestimonialsSlider();
    initCountdown();
    initAnimations();
    initBackToTop();
});

// Mobile Menu
function initMobileMenu() {
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', throttle(() => {
        // Header shadow on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }, 100));
}

// Search functionality
function initSearch() {
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(searchInput.value);
            }
        });
    }
}

function performSearch(query) {
    if (query.trim()) {
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
    }
}

// Newsletter form
function initNewsletter() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Simulate API call
                showNotification('Thank you for subscribing!');
                newsletterForm.reset();
            } else {
                showNotification('Please enter a valid email', 'error');
            }
        });
    }
}

// Testimonials Slider
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const testimonials = [
        {
            name: "John Doe",
            position: "Happy Customer",
            text: "Amazing shopping experience! Great products and excellent customer service. Will definitely shop again.",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            name: "Jane Smith",
            position: "Regular Shopper",
            text: "Fast delivery and top quality products. The prices are unbeatable!",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            name: "Mike Johnson",
            position: "Tech Enthusiast",
            text: "Found exactly what I was looking for. The website is easy to navigate and checkout was smooth.",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg"
        }
    ];
    
    // Create testimonial cards
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-avatar">
                <img src="${testimonial.avatar}" alt="${testimonial.name}">
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <h4 class="testimonial-name">${testimonial.name}</h4>
            <p class="testimonial-position">${testimonial.position}</p>
        `;
        slider.appendChild(card);
    });
    
    let currentIndex = 0;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < testimonials.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Auto slide
    setInterval(() => {
        if (currentIndex < testimonials.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);
}

// Countdown Timer
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set the date we're counting down to (7 days from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.querySelector('.days').textContent = days.toString().padStart(2, '0');
        countdownElement.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        countdownElement.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        countdownElement.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(x);
            countdownElement.innerHTML = "EXPIRED";
        }
    }
    
    updateCountdown();
    const x = setInterval(updateCountdown, 1000);
}

// Scroll animations
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add delay if specified
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    animateElements.forEach(element => observer.observe(element));
}

// Back to top
function initBackToTop() {
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Add to wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let wishlist = loadFromStorage('wishlist') || [];
    
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveToStorage('wishlist', wishlist);
        showNotification(`${product.name} added to wishlist!`);
    } else {
        showNotification('Product already in wishlist', 'info');
    }
}

// Product filtering
function applyFilters() {
    const category = document.querySelector('input[name="category"]:checked')?.value;
    const priceRange = document.getElementById('priceRange')?.value;
    const brands = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
        .map(cb => cb.value);
    const ratings = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
        .map(cb => cb.value);
    
    // Build URL with filters
    let url = new URL(window.location.href);
    if (category) url.searchParams.set('category', category);
    if (priceRange) url.searchParams.set('maxPrice', priceRange);
    if (brands.length) url.searchParams.set('brands', brands.join(','));
    if (ratings.length) url.searchParams.set('ratings', ratings.join(','));
    
    window.location.href = url.toString();
}

// Clear filters
function clearFilters() {
    window.location.href = window.location.pathname;
}

// Price range display
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

if (priceRange && priceValue) {
    priceRange.addEventListener('input', (e) => {
        priceValue.textContent = e.target.value;
    });
}

// Sort products
const sortSelect = document.getElementById('sortBy');
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        let url = new URL(window.location.href);
        url.searchParams.set('sort', e.target.value);
        window.location.href = url.toString();
    });
}

// View toggle (grid/list)
const viewBtns = document.querySelectorAll('.view-btn');
const productsGrid = document.getElementById('productsGrid');

if (viewBtns.length && productsGrid) {
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === 'grid') {
                productsGrid.classList.remove('list-view');
            } else {
                productsGrid.classList.add('list-view');
            }
        });
    });
}

// Pagination
function initPagination(totalItems, itemsPerPage) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = parseInt(getQueryParam('page')) || 1;
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    
    pagination.innerHTML = html;
}

function goToPage(page) {
    let url = new URL(window.location.href);
    url.searchParams.set('page', page);
    window.location.href = url.toString();
}

// Export functions for global use
window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.quickView = quickView;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;
window.goToPage = goToPage;