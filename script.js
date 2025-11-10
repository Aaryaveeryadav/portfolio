document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initTypingEffect();
    initAOS();
    initProjectModals();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        themeToggle.style.animation = 'none';
        setTimeout(() => {
            themeToggle.style.animation = '';
        }, 10);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            navMenu.classList.remove('active');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

function initScrollEffects() {
    const scrollToTop = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });
    
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'AI/ML Developer',
        'Full-Stack Engineer',
        'Data Science Enthusiast',
        'Problem Solver',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

function initProjectModals() {
    const projectDetails = {
        project1: {
            title: 'Face and Motion Detection System',
            date: 'Jan 2024 - Present',
            description: 'A comprehensive computer vision project that implements real-time face and motion detection in video streams.',
            fullDescription: `This advanced computer vision system leverages machine learning algorithms to detect human faces and motion in real-time video streams. The project demonstrates expertise in computer vision, real-time processing, and optimization techniques.`,
            features: [
                'Real-time face detection using Haar cascades',
                'Motion detection using background subtraction techniques',
                'Optimized for live camera feed processing',
                'High accuracy and low latency performance',
                'Integration with TensorFlow for enhanced detection'
            ],
            technologies: ['Python', 'TensorFlow', 'OpenCV', 'Computer Vision'],
            challenges: 'Optimizing performance for real-time processing while maintaining high accuracy in various lighting conditions.',
            outcome: 'Successfully deployed a robust system capable of processing live video feeds with minimal latency.'
        },
        project2: {
            title: 'Weather Forecast Web App',
            date: 'Jan 2025 - Present',
            description: 'A responsive web application providing accurate weather forecasts using real-time API data.',
            fullDescription: `A modern, user-friendly weather forecasting application that fetches real-time weather data from OpenWeatherMap API and displays comprehensive 5-day forecasts with an intuitive interface.`,
            features: [
                'Real-time weather data fetching from OpenWeatherMap API',
                'Interactive 5-day weather forecast',
                'Dynamic UI updates based on weather conditions',
                'Location-based weather search',
                'Responsive design for all devices'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript', 'OpenWeatherMap API'],
            challenges: 'Implementing smooth data updates and creating an intuitive UX that makes weather information easy to understand.',
            outcome: 'Created a polished, production-ready weather app with excellent user experience and accurate forecasts.'
        },
        project3: {
            title: 'SkillSwap - Skill Exchange Platform',
            date: 'Dec 2024 - Present',
            description: 'An innovative platform connecting people to exchange skills and learn from each other.',
            fullDescription: `SkillSwap is a full-stack web platform that uses AI to match users based on their skills and learning interests, creating a community-driven skill exchange ecosystem.`,
            features: [
                'AI-powered intelligent skill matching',
                'User profiles with skill listings',
                'Advanced search and filtering capabilities',
                'Real-time skill exchange requests',
                'Interactive user interface built with React.js'
            ],
            technologies: ['React.js', 'Bolt AI', 'HTML', 'CSS', 'JavaScript'],
            challenges: 'Implementing intelligent matching algorithms and creating an engaging user experience for skill discovery.',
            outcome: 'Built a functional platform that successfully connects users for mutually beneficial skill exchanges.'
        },
        project4: {
            title: 'Image Captioning System',
            date: 'Jan 2023 - Present',
            description: 'A deep learning system that automatically generates descriptive captions for images.',
            fullDescription: `An end-to-end deep learning solution that combines computer vision and natural language processing to generate accurate, human-like captions for images. The system uses state-of-the-art CNN and LSTM architectures.`,
            features: [
                'CNN-based image feature extraction',
                'LSTM networks for caption generation',
                'Trained on COCO dataset',
                'State-of-the-art performance metrics',
                'Real-time caption generation capability'
            ],
            technologies: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning', 'NLP'],
            challenges: 'Achieving high accuracy while generating contextually relevant and grammatically correct captions.',
            outcome: 'Developed a robust system that generates high-quality captions with state-of-the-art performance on standard benchmarks.'
        }
    };
    
    window.openModal = function(projectId) {
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');
        const project = projectDetails[projectId];
        
        if (project) {
            modalBody.innerHTML = `
                <h2 style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--text-color);">${project.title}</h2>
                <p style="color: var(--text-light); margin-bottom: 2rem;">${project.date}</p>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--primary-color);">Overview</h3>
                    <p style="color: var(--text-light); line-height: 1.8;">${project.fullDescription}</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--primary-color);">Key Features</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${project.features.map(feature => `
                            <li style="padding: 0.5rem 0; color: var(--text-light); display: flex; align-items: start; gap: 0.5rem;">
                                <i class="fas fa-check-circle" style="color: var(--primary-color); margin-top: 0.3rem;"></i>
                                <span>${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--primary-color);">Technologies Used</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${project.technologies.map(tech => `
                            <span style="background: var(--bg-secondary); padding: 8px 16px; border-radius: 20px; color: var(--primary-color); border: 1px solid var(--border-color);">${tech}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--primary-color);">Challenges & Solutions</h3>
                    <p style="color: var(--text-light); line-height: 1.8;">${project.challenges}</p>
                </div>
                
                <div>
                    <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: var(--primary-color);">Outcome</h3>
                    <p style="color: var(--text-light); line-height: 1.8;">${project.outcome}</p>
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeModal = function() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    const modal = document.getElementById('projectModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(99, 102, 241, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();



function openCertificate(certId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    let content = '';
    if (certId === 'sql') {
        content = `
            <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Microsoft SQL Certification</h2>
            <iframe src="assets/certificates/intellipaat-certificate.pdf" 
                    width="100%" height="600px" 
                    style="border:none; border-radius:10px;"></iframe>`;
    } else if (certId === 'ai_ml') {
        content = `
            <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Fundamentals in AI & ML</h2>
            <img src="assets/certificates/vityarth-9b78f4a5af.png" 
                 alt="AI & ML Certificate" 
                 style="width:100%; border-radius:10px;">`;
    } else if (certId === 'python') {
        content = `
            <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Python Essentials</h2>
            <img src="assets/certificates/vityarth-d878fcf4b7.png" 
                 alt="Python Certificate" 
                 style="width:100%; border-radius:10px;">`;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

