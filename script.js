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
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuButton || !navLinks) return;

    // Toggle menu when button is clicked
    mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
        
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        
        // change icon
        if (!isExpanded) {
            mobileMenuButton.innerHTML = '<svg width="28" height="28" fill="none" class="text-text-dark pointer-events-none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>';
            // prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenuButton.innerHTML = '<svg width="28" height="28" fill="none" class="text-text-dark pointer-events-none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !navLinks.classList.contains('hidden') && window.innerWidth < 768) {
            navLinks.classList.add('hidden');
            navLinks.classList.remove('flex');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.innerHTML = '<svg width="28" height="28" fill="none" class="text-text-dark pointer-events-none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navLinks.classList.add('hidden');
                navLinks.classList.remove('flex');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.innerHTML = '<svg width="28" height="28" fill="none" class="text-text-dark pointer-events-none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
                document.body.style.overflow = '';
            }
        });
    });
};

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', initMobileNav);

// Enhanced Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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
        '--color-primary': '#4f46e5',
        '--color-primary-dark': '#4338ca',
        '--color-secondary': '#0ea5e9',
        '--color-accent': '#f59e0b',
    },
    green: {
        '--color-primary': '#10b981',
        '--color-primary-dark': '#059669',
        '--color-secondary': '#22d3ee',
        '--color-accent': '#f59e0b',
    },
    red: {
        '--color-primary': '#ef4444',
        '--color-primary-dark': '#b91c1c',
        '--color-secondary': '#f87171',
        '--color-accent': '#f59e0b',
    },
    purple: {
        '--color-primary': '#a21caf',
        '--color-primary-dark': '#701a75',
        '--color-secondary': '#818cf8',
        '--color-accent': '#f59e0b',
    },
    orange: {
        '--color-primary': '#f59e0b',
        '--color-primary-dark': '#b45309',
        '--color-secondary': '#fbbf24',
        '--color-accent': '#4f46e5',
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
    const chatbotWindow = document.querySelector('.chatbot-window');
    const closeChatBtn = document.querySelector('.close-chat');
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
        if (chatbotWindow) chatbotWindow.classList.toggle('active');
        const isActive = chatbot.classList.contains('active');
        chatToggle.setAttribute('aria-expanded', isActive);

        // Focus input when chat opens
        if (isActive) {
            setTimeout(() => userInput.focus(), 300);
        }
    });

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function() {
            chatbot.classList.remove('active');
            if (chatbotWindow) chatbotWindow.classList.remove('active');
            chatToggle.setAttribute('aria-expanded', 'false');
        });
    }

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
        const alignClass = type === 'user' ? 'self-end' : 'self-start';
        messageDiv.className = `message ${type}-message flex max-w-[85%] animate-[messageSlideIn_0.3s_ease-out_forwards] ${alignClass} flex-col`;

        const messageContent = document.createElement('div');
        if (type === 'user') {
            messageContent.className = 'message-content p-[1rem_1.25rem] rounded-[1rem] text-[0.95rem] leading-[1.5] shadow-[0_2px_8px_rgba(0,0,0,0.05)] relative bg-primary text-white rounded-br-[0.25rem]';
        } else {
            messageContent.className = 'message-content p-[1rem_1.25rem] rounded-[1rem] text-[0.95rem] leading-[1.5] shadow-[0_2px_8px_rgba(0,0,0,0.05)] relative bg-white text-text-dark rounded-bl-[0.25rem] border border-black/[0.03]';
        }

        const messagePara = document.createElement('p');
        messagePara.className = 'm-0';
        messagePara.textContent = content;

        messageContent.appendChild(messagePara);
        messageDiv.appendChild(messageContent);

        // Add timestamp (optional)
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' +
            now.getMinutes().toString().padStart(2, '0');

        const timeSpan = document.createElement('span');
        timeSpan.className = `message-time text-[0.7rem] opacity-70 mt-1 px-1 ${type === 'user' ? 'self-end' : 'self-start'}`;
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
        suggestionsDiv.className = 'suggestion-buttons flex flex-wrap gap-[0.5rem] mt-[0.5rem] animate-[fadeIn_0.5s_ease-out_0.3s_both]';

        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'suggestion-btn bg-primary/10 text-primary border border-primary/20 p-[0.5rem_1rem] rounded-[2rem] text-[0.85rem] font-medium cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap hover:bg-primary hover:text-white hover:-translate-y-[2px] hover:shadow-[0_4px_10px_rgba(79,70,229,0.2)]';
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
        typingDiv.className = 'message bot-message typing-indicator flex max-w-[85%] self-start flex-col';

        const typingContent = document.createElement('div');
        typingContent.className = 'message-content p-[1rem_1.25rem] rounded-[1rem] text-[0.95rem] leading-[1.5] shadow-[0_2px_8px_rgba(0,0,0,0.05)] relative bg-white text-text-dark rounded-bl-[0.25rem] border border-black/[0.03]';

        const dots = document.createElement('div');
        dots.className = 'typing-dots flex gap-[5px] items-center h-[20px]';
        dots.innerHTML = '<span class="w-[8px] h-[8px] rounded-full bg-[#cbd5e1] animate-[bounce_1s_infinite]"></span><span class="w-[8px] h-[8px] rounded-full bg-[#cbd5e1] animate-[bounce_1s_infinite]" style="animation-delay: 0.2s"></span><span class="w-[8px] h-[8px] rounded-full bg-[#cbd5e1] animate-[bounce_1s_infinite]" style="animation-delay: 0.4s"></span>';

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
