// DJ La Mafe Website JavaScript
// All functionality converted from Next.js to vanilla JavaScript

// Global variables
let videoSwiper, gallerySwiper;
let isClient = false;

// Gallery images - will be populated dynamically
const galleryImages = [];

// Video data
const videoFiles = [
    { id: '1', filename: 'dj1.mp4', title: 'Live Set - Festival Vibes', type: 'mp4' },
    { id: '2', filename: 'dj2.mp4', title: 'Club Night Energy', type: 'mp4' },
    { id: '3', filename: 'dj3.mp4', title: 'Sunset Rooftop Session', type: 'mp4' },
    { id: '4', filename: 'dj4.mp4', title: 'Private Party Magic', type: 'mp4' },
    { id: '5', filename: 'dj5.mp4', title: 'Underground Warehouse', type: 'mp4' },
    { id: '6', filename: 'mov/dj1.MOV', title: 'Behind the Decks', type: 'MOV' },
    { id: '7', filename: 'mov/dj2.MOV', title: 'Sound Check Vibes', type: 'MOV' },
    { id: '8', filename: 'mov/dj3.MOV', title: 'Crowd Connection', type: 'MOV' },
    { id: '9', filename: 'mov/dj4.MOV', title: 'Late Night Sessions', type: 'MOV' }
];

// Populate gallery images dynamically
for (let i = 1; i <= 50; i++) {
    galleryImages.push(`image${i}.png`);
}

// Shows data (user-provided venues)
const shows = [
  { name: 'The Edge', location: 'Manhattan' },
  { name: 'Peak', location: 'Manhattan' },
  { name: 'Makara', location: 'Queens' },
  { name: 'Wallflower', location: 'Manhattan' },
  { name: 'Music for a While', location: 'Manhattan' },
  { name: 'What the Fish', location: 'Queens' },
  { name: 'Café Baleárica', location: 'Brooklyn' },
  { name: 'Santa Salsa', location: 'Brooklyn' },
  { name: 'The Wallking', location: 'Brooklyn' },
  { name: 'Rebecca’s', location: 'Brooklyn' },
  { name: 'Quin Bar', location: 'Manhattan' },
  { name: 'Legends', location: 'Queens' },
  { name: 'La Oficina', location: 'Brooklyn' },
  { name: 'Our Wicked Lady', location: 'Brooklyn' },
  { name: 'Palenque', location: 'Brooklyn' },
  { name: 'Mad Tropical', location: 'Brooklyn' },
  { name: 'Caribbean Social Club (Toñita’s)', location: 'Brooklyn' },
  { name: 'Café Flor', location: 'Manhattan' },
  { name: 'Republic', location: 'Brooklyn' },
  { name: 'SiriusXM', location: '' }
];

// Floating elements data
const floatingElements = [
    'disco.svg',
    'pinkcircle.svg', 
    'pinkdiamond.svg',
    'purplecircle.svg',
    'whitecircle.svg',
    'yellowdiamond.svg',
    'yellowpinkdaisy.svg'
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    isClient = true;
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initializeNavigation();
    initializeBackgroundElements();
    initializeHeroAnimations();
    initializeVideoCarousel();
    initializeGalleryCarousel();
    initializeShowsSection();
    initializeBookingForm();
    initializeScrollEffects();
    initializeVideoModal();
}

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        }
    });
}

// Background elements animation
function initializeBackgroundElements() {
    createFloatingElements();
    createClouds();
    createSwiggles();
    createStars();
}

function createFloatingElements() {
    const container = document.querySelector('.floating-elements-container');
    if (!container) return;

    // Clear any existing elements to avoid duplicates on resize
    container.innerHTML = '';

    // Inject keyframes once
    if (!document.getElementById('floating-party-styles')) {
        const style = document.createElement('style');
        style.id = 'floating-party-styles';
        style.textContent = `
          @keyframes partyFloat {
            0%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
            25%  { transform: translate3d(var(--dx), calc(var(--dy) * -1), 0) rotate(8deg) scale(1.06); }
            50%  { transform: translate3d(calc(var(--dx) * -1), var(--dy), 0) rotate(-10deg) scale(0.96); }
            75%  { transform: translate3d(var(--dx2), var(--dy2), 0) rotate(6deg) scale(1.03); }
            100% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
          }
          @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
    }

    // More elements, fully randomized
    const elementCount = window.innerWidth < 768 ? 48 : 96;
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';

        const x = Math.random() * 100; // viewport %
        // Bias toward top: power distribution (more values near 0)
        const y = Math.pow(Math.random(), 1.9) * 100; // 0..100, concentrated near top
        const size = Math.floor(16 + Math.random() * 56); // 16..72px
        const delay = +(Math.random() * 6).toFixed(2);
        const duration = 6 + Math.random() * 12; // 6..18s
        const dx = `${Math.floor(8 + Math.random() * 24)}px`; // 8..32px
        const dy = `${Math.floor(8 + Math.random() * 24)}px`;
        const dx2 = `${Math.floor(-20 + Math.random() * 40)}px`; // -20..20px
        const dy2 = `${Math.floor(-20 + Math.random() * 40)}px`;
        const z = Math.random() < 0.3 ? 0 : -1; // mix some behind

        const elementFile = floatingElements[i % floatingElements.length];

        // Base positioning layer
        element.style.position = 'absolute';
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.pointerEvents = 'none';
        element.style.zIndex = `${z}`;
        element.style.willChange = 'transform';

        // Animation variables
        element.style.setProperty('--dx', dx);
        element.style.setProperty('--dy', dy);
        element.style.setProperty('--dx2', dx2);
        element.style.setProperty('--dy2', dy2);

        // Compose animations: party float + occasional slow spin for extra fun
        const spin = Math.random() < 0.45; // ~45% spin
        element.style.animation = `partyFloat ${duration.toFixed(2)}s ease-in-out ${delay}s infinite alternate` + (spin ? `, slowSpin ${Math.floor(12 + Math.random() * 20)}s linear infinite` : '');

        const img = document.createElement('img');
        const assetPath = `./public/assets/floating elements/${elementFile}`;
        img.src = assetPath;
        img.alt = `Floating Element ${i + 1}`;
        img.draggable = false;
        img.loading = 'lazy';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.pointerEvents = 'none';
        img.style.filter = `drop-shadow(0 0 8px rgba(255,101,193,0.45)) drop-shadow(0 0 12px rgba(195,154,255,0.25))`;

        element.appendChild(img);
        container.appendChild(element);
    }
}

function createClouds() {
    const container = document.querySelector('.clouds-container');
    if (!container) return;

    for (let i = 0; i < 12; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud salmon-cloud';
        
        const cloudX = (i * 15 + 10) % 120 - 10;
        const cloudY = (i * 12 + 5) % 100;
        const cloudWidth = 80 + (i * 7) % 60;
        const cloudHeight = 50 + (i * 5) % 40;
        const duration = 20 + (i * 3) % 10;
        
        cloud.style.left = `${cloudX}%`;
        cloud.style.top = `${cloudY}%`;
        cloud.style.width = `${cloudWidth}px`;
        cloud.style.height = `${cloudHeight}px`;
        cloud.style.animationDelay = `${i * 2.5}s`;
        cloud.style.animationDuration = `${duration}s`;
        
        // Add salmon color and soft glow
        cloud.style.background = 'radial-gradient(ellipse, rgba(250, 128, 114, 0.3), rgba(250, 128, 114, 0.1))';
        cloud.style.borderRadius = '50px';
        cloud.style.filter = 'blur(1px)';
        cloud.style.boxShadow = '0 0 20px rgba(250, 128, 114, 0.2)';
        
        container.appendChild(cloud);
    }
}

function createSwiggles() {
    const container = document.querySelector('.swiggles-container');
    if (!container) return;

    for (let i = 0; i < 6; i++) {
        const swiggle = document.createElement('div');
        swiggle.className = 'swiggle';
        
        const rotation = (i * 15 - 22.5) % 45;
        const duration = 8 + (i * 2) % 4;
        
        swiggle.style.left = `${10 + i * 15}%`;
        swiggle.style.top = `${20 + (i % 3) * 30}%`;
        swiggle.style.transform = `rotate(${rotation}deg)`;
        swiggle.style.animationDelay = `${i * 1.5}s`;
        swiggle.style.animationDuration = `${duration}s`;
        
        container.appendChild(swiggle);
    }
}

function createStars() {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const starX = (i * 7 + 5) % 100;
        const starY = (i * 11 + 10) % 100;
        const duration = 4 + (i % 3);
        const delay = (i * 0.3) % 3;
        
        star.style.left = `${starX}%`;
        star.style.top = `${starY}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        container.appendChild(star);
    }
}

// Hero section animations
function initializeHeroAnimations() {
    const taglineParts = document.querySelectorAll('.tagline-part');
    
    taglineParts.forEach((part, index) => {
        const delay = parseFloat(part.getAttribute('data-delay')) || 0;
        part.style.animationDelay = `${delay}s`;
    });

    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            scrollToSection('video-carousel');
        });
    }
}

// Simple Video Carousel - Load ALL your actual videos
function initializeVideoCarousel() {
    const track = document.getElementById('videoCarousel');
    if (!track) return;

    const COUNT = 5; // dj1..dj5
    const CARD_W = 380; // TALL! match CSS width
    const GAP = 32; // gap for tall cards
    const STEP = CARD_W + GAP; // per card step

    // Inject carousel CSS for continuous scroll
    const style = document.createElement('style');
    style.textContent = `
      .video-carousel {
        display: flex;
        gap: ${GAP}px;
        padding: 20px 0;
        will-change: transform;
        animation: vc-scroll 30s linear infinite !important;
      }
      .video-item { flex: 0 0 ${CARD_W}px; height: 720px; border-radius: 28px; overflow: hidden; position: relative; }
      .video-item video { width: 100%; height: 100%; object-fit: cover; display: block; }
      @keyframes vc-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-1 * ${STEP}px * ${COUNT})); }
      }
      @media (max-width: 768px) {
        .video-item { flex-basis: 280px; height: 520px; }
      }
    `;
    document.head.appendChild(style);

    // Helper to create a card
    const makeCard = (i) => {
      const wrap = document.createElement('div');
      wrap.className = 'video-item';
      const v = document.createElement('video');
      v.src = `./public/assets/videos/dj${i}.mp4`;
      v.preload = 'metadata'; // save bandwidth until hover
      v.muted = true; // avoid autoplay policy issues
      v.loop = true;
      v.playsInline = true;
      // Do NOT autoplay: only play on hover
      wrap.appendChild(v);
      // Hover behavior: pause carousel + play video
      wrap.addEventListener('mouseenter', () => {
        console.log('Video hover enter - pausing carousel');
        // Force pause the scrolling with important override
        track.style.setProperty('animation-play-state', 'paused', 'important');
        // Nudge network without resetting the decoder to avoid flicker
        try { if (v.preload !== 'auto') { v.preload = 'auto'; } } catch(_) {}
        v.play().catch(() => {});
      });
      wrap.addEventListener('mouseleave', () => {
        console.log('Video hover leave - resuming carousel');
        // Pause the video and resume carousel
        v.pause();
        track.style.setProperty('animation-play-state', 'running', 'important');
      });
      return wrap;
    };

    // Build originals
    for (let i = 1; i <= COUNT; i++) {
      track.appendChild(makeCard(i));
    }
    // Duplicate once for seamless loop
    for (let i = 1; i <= COUNT; i++) {
      track.appendChild(makeCard(i));
    }

    // Ensure animation is running on init (in case a previous pause stuck)
    track.style.animationPlayState = 'running';
}

// SIMPLE GALLERY - No Swiper, just pure CSS animation
function initializeGalleryCarousel() {
    const galleryContainer = document.querySelector('.gallery-swiper .swiper-wrapper');
    if (!galleryContainer) {
        console.log('❌ Gallery container not found!');
        return;
    }

    console.log('🎯 Initializing SIMPLE gallery with CSS animation...');
    
    // Clear existing content
    galleryContainer.innerHTML = '';
    
    // Create a simple scrolling container - SLOWER movement
    galleryContainer.style.cssText = `
        display: flex;
        width: max-content;
        animation: galleryScroll 80s linear infinite;
        gap: 20px;
    `;
    
    // Add CSS animation with hover pause and glow
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes galleryScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .swiper-wrapper {
            animation-play-state: running;
        }
        .swiper-wrapper:hover {
            animation-play-state: paused !important;
        }
        .gallery-simple-item {
            flex: 0 0 auto;
            width: min(90vw, 420px);
            height: 480px;
            transition: all 0.3s ease;
        }
        .gallery-simple-item:hover {
            transform: scale(1.05);
            z-index: 10;
        }
        .gallery-simple-item:hover .gallery-card {
            box-shadow: 0 0 20px rgba(255, 101, 193, 0.6), 0 0 40px rgba(255, 101, 193, 0.4), 0 8px 30px rgba(0,0,0,0.4);
        }
    `;
    document.head.appendChild(animationStyle);

    // Load images and duplicate for seamless loop
    const images = [];
    for (let i = 1; i <= 29; i++) {
        images.push(i);
    }
    
    // Create slides (original + duplicate for seamless loop)
    [...images, ...images].forEach((i) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-simple-item';
        
        const galleryCard = document.createElement('div');
        galleryCard.className = 'gallery-card';
        
        const tilt = document.createElement('div');
        tilt.className = 'card-tilt';
        
        const imgElement = document.createElement('img');
        imgElement.src = `./public/assets/pictures/image${i}.png`;
        imgElement.alt = `Gallery ${i}`;
        imgElement.loading = 'lazy';
        
        imgElement.onload = () => console.log(`✅ Loaded image${i}.png`);
        imgElement.onerror = () => console.log(`❌ Failed to load image${i}.png`);
        
        tilt.appendChild(imgElement);
        galleryCard.appendChild(tilt);
        slide.appendChild(galleryCard);
        galleryContainer.appendChild(slide);
    });
    
    console.log('🎯 Simple gallery initialized with', images.length * 2, 'slides');
}

// Shows section initialization
function initializeShowsSection() {
    const showsContainer = document.querySelector('.shows-container');
    if (!showsContainer) return;

    // Inject CSS for word-cloud style (no backgrounds, varied sizes/colors)
    const sStyle = document.createElement('style');
    sStyle.textContent = `
      .shows-container { display: flex; flex-wrap: wrap; gap: 18px 28px; align-items: center; justify-content: center; }
      .show-item { 
        background: none;
        border: none;
        padding: 0;
        transform: translateZ(0);
        transition: filter 220ms ease;
        will-change: transform;
        /* independent gentle float animations */
        animation: floatX var(--dxDur, 8s) ease-in-out var(--dxDelay, 0s) infinite alternate,
                   floatY var(--dyDur, 10s) ease-in-out var(--dyDelay, 0s) infinite alternate;
      }
      .show-token { 
        display: inline-block;
        font-weight: 800;
        line-height: 1;
        white-space: nowrap;
        text-shadow: 0 2px 6px rgba(0,0,0,0.45), 0 0 10px rgba(255,101,193,0.35);
        transition: transform 200ms ease;
      }
      .show-item:hover { animation-play-state: paused; z-index: 10; filter: drop-shadow(0 0 16px rgba(255,101,193,0.45)); }
      .show-item:hover .show-token { transform: scale(1.12); }
      @keyframes floatX { from { transform: translateX(0); } to { transform: translateX(var(--dx, 8px)); } }
      @keyframes floatY { from { transform: translateY(0); } to { transform: translateY(var(--dy, 10px)); } }
    `;
    document.head.appendChild(sStyle);

    // Create items with varied size and brand colors
    shows.forEach((show, index) => {
      const el = document.createElement('div');
      el.className = 'show-item';
      const sizes = ['1.1rem', '1.35rem', '1.65rem', '2.0rem'];
      const colors = ['var(--text-pink)', 'var(--neon-purple)', 'var(--neon-blue)', 'var(--deep-orange)'];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const locSize = '0.8em';
      const sep = ' · ';
      // random float amplitudes (px), durations (s), and delays (s)
      const dx = 6 + Math.floor(Math.random() * 14);   // 6..19px
      const dy = 6 + Math.floor(Math.random() * 16);   // 6..21px
      const dxDur = (6 + Math.random() * 6).toFixed(2); // 6..12s
      const dyDur = (7 + Math.random() * 7).toFixed(2); // 7..14s
      const dxDelay = (Math.random() * 3).toFixed(2);
      const dyDelay = (Math.random() * 3).toFixed(2);
      el.style.setProperty('--dx', dx + 'px');
      el.style.setProperty('--dy', dy + 'px');
      el.style.setProperty('--dxDur', dxDur + 's');
      el.style.setProperty('--dyDur', dyDur + 's');
      el.style.setProperty('--dxDelay', dxDelay + 's');
      el.style.setProperty('--dyDelay', dyDelay + 's');
      el.innerHTML = `
        <span class="show-token" style="font-size:${size}; color:${color}">
          ${show.name}<span style="opacity:.85; font-weight:700; font-size:${locSize}">${sep}${show.location}</span>
        </span>
      `;
      showsContainer.appendChild(el);
    });
}

// Booking form functionality
function initializeBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            console.log('Booking form submitted:', data);
            
            // Show success message
            bookingForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Reset form after 5 seconds
            setTimeout(() => {
                bookingForm.style.display = 'block';
                formSuccess.classList.remove('show');
                bookingForm.reset();
            }, 5000);
        });
    }
}

// Video modal functionality
function initializeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    // Close modal when clicking overlay
    const overlay = document.querySelector('.video-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeVideoModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeVideoModal();
        }
    });
}

// Fullscreen video modal (from working example)
function openVideoModal(videoElement) {
    const modal = document.createElement('div');
    modal.classList.add('video-modal', 'active');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    // Keep background videos playing for ambiance; no global pause
    
    const videoClone = videoElement.cloneNode(true);
    videoClone.controls = true;
    videoClone.muted = false;
    
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-modal');
    closeBtn.innerHTML = 'X';
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    modalContent.appendChild(videoClone);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
    
    document.body.appendChild(modal);
    
    // Play the video when modal opens
    setTimeout(() => {
        videoClone.play();
    }, 300);
}

// Close video modal
function closeVideoModal() {
    const modals = document.querySelectorAll('.video-modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    modal.classList.remove('show');
    modalVideo.pause();
    modalVideo.src = '';
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const backgroundElements = document.querySelector('.background-elements');
        if (backgroundElements) {
            backgroundElements.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Utility function to scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Find the section title within the section for better positioning
        const titleContainer = element.querySelector('.section-title-container');
        const targetElement = titleContainer || element;
        
        // Adjust offset to account for fixed header and section padding
        const headerHeight = 80; // fixed header height
        const extraOffset = 20; // small buffer for perfect positioning
        const offsetTop = targetElement.offsetTop - headerHeight - extraOffset;
        
        window.scrollTo({
            top: Math.max(0, offsetTop), // prevent negative scroll
            behavior: 'smooth'
        });
    }
}

// Window resize handler
window.addEventListener('resize', function() {
    // Reinitialize background elements on resize
    if (isClient) {
        const containers = [
            '.floating-elements-container',
            '.clouds-container',
            '.swiggles-container',
            '.stars-container'
        ];
        
        containers.forEach(selector => {
            const container = document.querySelector(selector);
            if (container) {
                container.innerHTML = '';
            }
        });
        
        initializeBackgroundElements();
    }
});


// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Gallery is now pure CSS - no JavaScript needed for movement!

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
