// Animate sections on scroll
const animateOnScroll = () => {
    const animatedSections = document.querySelectorAll('.section-header, .testimonial-item, .process-step, .partners-logos img, .faq-item');
    const triggerBottom = window.innerHeight * 0.85;
    animatedSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('animate');
        }
    });
};
window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);

// FAQ Accordion
const initFAQAccordion = () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });
};
document.addEventListener('DOMContentLoaded', initFAQAccordion);

// Navbar hide on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
});

// Mobile Navigation
const initMobileNav = () => {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
    mobileMenuButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    const nav = document.querySelector('nav');
    nav.insertBefore(mobileMenuButton, nav.firstChild);

    const navLinks = document.querySelector('.nav-links');

    // Toggle menu when button is clicked
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileMenuButton.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            mobileMenuButton.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            mobileMenuButton.classList.remove('active');
        });
    });
};

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', initMobileNav);

// Custom smooth scroll with animation curve
function smoothScrollTo(targetY, duration = 700) {
    const startY = window.scrollY;
    const changeY = targetY - startY;
    const startTime = performance.now();
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startY + changeY * ease);
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    requestAnimationFrame(animateScroll);
}

// Enhanced Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});
backToTopBtn.addEventListener('click', () => {
    smoothScrollTo(0);
});

// Enhanced smooth scrolling for navigation links
function handleAnchorClick(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const rect = target.getBoundingClientRect();
            const scrollTop = window.scrollY + rect.top - 60; // offset for fixed header
            smoothScrollTo(scrollTop);
        }
    }
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.removeEventListener('click', handleAnchorClick); // prevent duplicate
    anchor.addEventListener('click', handleAnchorClick);
});

// Testimonials Carousel
(function () {
    const items = document.querySelectorAll('.carousel-inner .testimonial-item');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const leftBtn = document.querySelector('.carousel-btn.left');
    const rightBtn = document.querySelector('.carousel-btn.right');
    let current = 0;
    let interval;

    function showSlide(idx) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === idx);
            indicators[i].classList.toggle('active', i === idx);
        });
        current = idx;
    }
    function nextSlide() {
        showSlide((current + 1) % items.length);
    }
    function prevSlide() {
        showSlide((current - 1 + items.length) % items.length);
    }
    function startAuto() {
        interval = setInterval(nextSlide, 5000);
    }
    function stopAuto() {
        clearInterval(interval);
    }
    rightBtn.addEventListener('click', () => { nextSlide(); stopAuto(); startAuto(); });
    leftBtn.addEventListener('click', () => { prevSlide(); stopAuto(); startAuto(); });
    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => { showSlide(i); stopAuto(); startAuto(); });
    });
    document.querySelector('.carousel').addEventListener('mouseenter', stopAuto);
    document.querySelector('.carousel').addEventListener('mouseleave', startAuto);
    showSlide(0);
    startAuto();
})();

// Parallax effect for hero section
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const scrolled = window.scrollY;
    hero.style.backgroundPosition = `center ${scrolled * 0.4}px`;
});

// Theme Switcher
const themeColors = {
    default: {
        '--primary-color': '#4f46e5',
        '--primary-dark': '#4338ca',
        '--secondary-color': '#0ea5e9',
        '--accent-color': '#f59e0b',
    },
    green: {
        '--primary-color': '#10b981',
        '--primary-dark': '#059669',
        '--secondary-color': '#22d3ee',
        '--accent-color': '#f59e0b',
    },
    red: {
        '--primary-color': '#ef4444',
        '--primary-dark': '#b91c1c',
        '--secondary-color': '#f87171',
        '--accent-color': '#f59e0b',
    },
    purple: {
        '--primary-color': '#a21caf',
        '--primary-dark': '#701a75',
        '--secondary-color': '#818cf8',
        '--accent-color': '#f59e0b',
    },
    orange: {
        '--primary-color': '#f59e0b',
        '--primary-dark': '#b45309',
        '--secondary-color': '#fbbf24',
        '--accent-color': '#4f46e5',
    }
};
function setTheme(theme) {
    const colors = themeColors[theme] || themeColors.default;
    Object.keys(colors).forEach(key => {
        document.documentElement.style.setProperty(key, colors[key]);
    });
    localStorage.setItem('site-theme', theme);
}
document.querySelectorAll('.theme-color').forEach(btn => {
    btn.addEventListener('click', function () {
        setTheme(this.dataset.theme);
    });
});
// Load theme on page load
const savedTheme = localStorage.getItem('site-theme');
if (savedTheme && themeColors[savedTheme]) {
    setTheme(savedTheme);
}

// Navbar Dropdown for Mobile
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
if (dropdown && dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            dropdownToggle.setAttribute('aria-expanded', dropdown.classList.contains('active'));
        }
    });
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        }
    });
    // Close dropdown when a dropdown-menu link is clicked
    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                dropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Modern, Fast Chatbot Implementation
document.addEventListener('DOMContentLoaded', function () {
    const chatbot = document.getElementById('chatbot');
    const chatToggle = document.querySelector('.chatbot-toggle');
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userMessage');

    // FAQ responses
    const responses = {
        greeting: [
            "Hello! How can I help you today?",
            "Hi there! What can I assist you with?",
            "Welcome! What brings you here today?"
        ],
        services: [
            "We offer web development, mobile app development, UI/UX design, and digital marketing services. Would you like more details about any of these?",
            "Our services include custom web development, mobile applications, digital marketing, and UI/UX design. Need any specific information?"
        ],
        contact: [
            "You can reach us at hello@digitalcraft.com or call us at +1 (555) 123-4567. Would you like us to contact you?",
            "Feel free to email us at hello@digitalcraft.com or fill out the contact form on our website. Can I help you with anything else?"
        ],
        pricing: [
            "Our pricing depends on the specific requirements of your project. Would you like to get a personalized quote?",
            "We offer custom quotes based on your project needs. Would you like to schedule a consultation with our team?"
        ],
        timeline: [
            "Project timelines vary based on complexity. Most projects take 4-12 weeks from start to finish. Do you have a specific deadline?",
            "Typically, our projects range from 4-12 weeks depending on scope. Would you like to discuss your timeline requirements?"
        ],
        portfolio: [
            "You can view our recent work in the Portfolio section of this website. Would you like me to point you to any specific type of project?",
            "Check out our Portfolio section for examples of our recent projects. Any particular industry or project type you're interested in?"
        ],
        default: [
            "I'm not sure I understand. Could you rephrase that?",
            "I don't have that information at the moment. Would you like to speak with a team member?",
            "That's a great question! I'll have one of our team members get back to you with more details."
        ]
    };

    // Suggestion buttons follow-ups - context-aware smart suggestions
    const followupSuggestions = {
        services: [
            { text: "Web Development", query: "web development" },
            { text: "Mobile Apps", query: "mobile apps" },
            { text: "Digital Marketing", query: "digital marketing" },
            { text: "UI/UX Design", query: "ui/ux design" }
        ],
        pricing: [
            { text: "Get a Quote", query: "quote" },
            { text: "Schedule Consultation", query: "schedule consultation" },
            { text: "View Packages", query: "pricing packages" }
        ],
        contact: [
            { text: "Call Us", query: "phone number" },
            { text: "Email", query: "email address" },
            { text: "Contact Form", query: "contact form" }
        ],
        portfolio: [
            { text: "Web Projects", query: "web projects" },
            { text: "Mobile Apps", query: "app projects" },
            { text: "Marketing Cases", query: "marketing projects" }
        ]
    };

    // Toggle chatbot visibility
    chatToggle.addEventListener('click', function () {
        chatbot.classList.toggle('active');
        const isActive = chatbot.classList.contains('active');
        chatToggle.setAttribute('aria-expanded', isActive);

        // Focus input when chat opens
        if (isActive) {
            setTimeout(() => userInput.focus(), 300);
        }
    });

    // Handle form submission
    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage('user', message);
        userInput.value = '';

        // Simulate thinking with typing indicator
        addTypingIndicator();

        // Process response after a short delay (feels more natural)
        setTimeout(() => {
            removeTypingIndicator();
            processUserMessage(message);
        }, Math.random() * 800 + 600); // Random delay between 600-1400ms
    });

    // Handle suggestion button clicks
    chatMessages.addEventListener('click', function (e) {
        if (e.target.classList.contains('suggestion-btn')) {
            const query = e.target.dataset.query;

            // Add user message as if they typed it
            addMessage('user', e.target.textContent);

            // Remove the suggestion buttons after clicking
            removeSuggestionButtons();

            // Process the query
            addTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                processUserMessage(query);
            }, Math.random() * 800 + 400);
        }
    });

    // Process user message and generate response
    function processUserMessage(message) {
        message = message.toLowerCase();
        let responseType = '';

        // Determine which response category to use
        let responseArray;

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            responseArray = responses.greeting;
        } else if (message.includes('service') || message.includes('offer') || message.includes('provide') || message.includes('web') || message.includes('mobile') || message.includes('app') || message.includes('market')) {
            responseArray = responses.services;
            responseType = 'services';
        } else if (message.includes('contact') || message.includes('call') || message.includes('email') || message.includes('reach') || message.includes('phone')) {
            responseArray = responses.contact;
            responseType = 'contact';
        } else if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('much') || message.includes('quote')) {
            responseArray = responses.pricing;
            responseType = 'pricing';
        } else if (message.includes('time') || message.includes('long') || message.includes('when') || message.includes('deadline')) {
            responseArray = responses.timeline;
        } else if (message.includes('portfolio') || message.includes('work') || message.includes('example') || message.includes('project')) {
            responseArray = responses.portfolio;
            responseType = 'portfolio';
        } else {
            responseArray = responses.default;
        }

        // Get random response from appropriate category
        const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];

        // Add bot response
        addMessage('bot', randomResponse);

        // Add contextual follow-up suggestions if available
        if (responseType && followupSuggestions[responseType]) {
            addSuggestionButtons(followupSuggestions[responseType]);
        } else {
            // Add general suggestion buttons if no specific context
            addSuggestionButtons([
                { text: "Services", query: "services" },
                { text: "Pricing", query: "pricing" },
                { text: "Contact", query: "contact" }
            ]);
        }
    }

    // Add message to chat
    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messagePara = document.createElement('p');
        messagePara.textContent = content;

        messageContent.appendChild(messagePara);
        messageDiv.appendChild(messageContent);

        // Add timestamp (optional)
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' +
            now.getMinutes().toString().padStart(2, '0');

        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = timeString;
        messageDiv.appendChild(timeSpan);

        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        scrollToBottom();
    }

    // Add suggestion buttons
    function addSuggestionButtons(suggestions) {
        // Remove any existing suggestion buttons
        removeSuggestionButtons();

        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'suggestion-buttons';

        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'suggestion-btn';
            button.dataset.query = suggestion.query;
            button.textContent = suggestion.text;
            suggestionsDiv.appendChild(button);
        });

        chatMessages.appendChild(suggestionsDiv);
        scrollToBottom();
    }

    // Remove all suggestion buttons
    function removeSuggestionButtons() {
        const existingSuggestions = chatMessages.querySelectorAll('.suggestion-buttons');
        existingSuggestions.forEach(el => el.remove());
    }

    // Show typing indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';

        const typingContent = document.createElement('div');
        typingContent.className = 'message-content';

        const dots = document.createElement('div');
        dots.className = 'typing-dots';
        dots.innerHTML = '<span></span><span></span><span></span>';

        typingContent.appendChild(dots);
        typingDiv.appendChild(typingContent);

        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

// Floating Theme Switcher Toggle
const themeSwitcherFloating = document.querySelector('.theme-switcher-floating');
const themeSwitcherToggle = document.querySelector('.theme-switcher-toggle');
if (themeSwitcherFloating && themeSwitcherToggle) {
    themeSwitcherToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        themeSwitcherFloating.classList.toggle('active');
    });
    themeSwitcherToggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeSwitcherFloating.classList.toggle('active');
        }
    });
    // Optional: close when clicking outside
    document.addEventListener('click', function (e) {
        if (!themeSwitcherFloating.contains(e.target)) {
            themeSwitcherFloating.classList.remove('active');
        }
    });
}

// Rest of your existing JavaScript code...
