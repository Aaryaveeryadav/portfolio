document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initTypingEffect();
    initAOS();
    initProjectModals();
    createParticles();
});

/* ---------------- Theme ---------------- */

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const activeTheme = html.getAttribute('data-theme');
        const newTheme = activeTheme === 'light' ? 'dark' : 'light';

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
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ---------------- Navigation ---------------- */

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetSection = targetId && document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }

            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }

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

/* ---------------- Scroll to top ---------------- */

function initScrollEffects() {
    const scrollToTop = document.getElementById('scrollToTop');
    if (!scrollToTop) return;

    window.addEventListener('scroll', () => {
        scrollToTop.classList.toggle('visible', window.pageYOffset > 300);
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------------- Hero typing effect ---------------- */

function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const texts = [
        'AI/ML Engineer',
        'Full-Stack Developer',
        'Computer Vision Enthusiast',
        'Generative AI Explorer',
        'Data Science Practitioner'
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

/* ---------------- AOS ---------------- */

function initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
}

/* ---------------- Project modals ---------------- */

function initProjectModals() {
    const projectDetails = {
        rerun: {
            title: 'ReRun — Autonomous AI Coding Agent',
            date: '2025 · Python, FastAPI, React, Docker, SQLite/PostgreSQL',
            fullDescription: `ReRun turns a natural-language task into a verified, sandboxed execution outcome instead of a single-shot code suggestion. A closed loop — understand, plan, delegate, generate, secure, execute, observe, diagnose, repair, validate — keeps the agent working on a task until the result is actually correct, not merely "exit code 0".`,
            features: [
                'Hierarchical supervision: a Master Agent coordinates specialised Planner, Coding, Recovery and Task Validator agents',
                'Runtime-guided targeted recovery driven by an error taxonomy, instead of blind regeneration',
                'Execution-history-aware memory that tracks code versions, parent diffs and repeated error signatures',
                'Task-level semantic verification that separates execution success from task completion (catches "false successes")',
                'Defense-in-depth sandboxing: static AST policy checks, disposable Docker containers, cgroup CPU/memory caps and network isolation',
                'FastAPI gateway with REST + WebSocket streaming to a React dashboard'
            ],
            technologies: ['Python', 'FastAPI', 'React', 'Docker', 'SQLite', 'PostgreSQL', 'WebSockets'],
            challenges: 'Autonomous agents often stop at "the code ran without crashing" even when the output does not satisfy the request. Designing a recovery loop that classifies runtime errors, avoids circular repairs and then verifies the outcome semantically was the core engineering problem.',
            outcome: 'Delivered a modular agent platform with a supervised multi-agent architecture, sandboxed execution and a validation layer that flags false successes before a task is marked complete.',
            links: [
                { label: 'View source on GitHub', url: 'https://github.com/Aaryaveeryadav/ReRun', icon: 'fab fa-github' }
            ]
        },
        tumor: {
            title: 'Brain Tumour MRI Segmentation',
            date: '2025 · Python, TensorFlow/Keras, U-Net, OpenCV',
            fullDescription: `An end-to-end deep learning pipeline that segments tumour regions from FLAIR brain MRI images. A lightweight U-Net keeps the model trainable on modest hardware while still learning the fine boundaries that matter for segmentation, and the pipeline is benchmarked against a classical image-processing baseline.`,
            features: [
                'Lightweight U-Net architecture for pixel-wise tumour segmentation',
                'Preprocessing pipeline: normalisation, resizing, filtering, CLAHE contrast enhancement and data augmentation',
                'Evaluated with Dice score and IoU against a classical image-processing baseline',
                '≈ 0.40 validation Dice and 0.32 IoU — roughly 6× the baseline Dice of ≈ 0.066',
                'Modular training code that supports re-training on additional MRI datasets'
            ],
            technologies: ['Python', 'TensorFlow', 'Keras', 'U-Net', 'OpenCV', 'NumPy'],
            challenges: 'Medical images are scarce, low-contrast and highly imbalanced — tumours occupy a small fraction of each scan. Careful preprocessing (CLAHE, augmentation) and a small U-Net were needed to get usable Dice scores without a large compute budget.',
            outcome: 'Achieved approximately 0.40 validation Dice and 0.32 IoU, a substantial improvement over the classical baseline, with a reproducible training and evaluation pipeline.',
            links: []
        },
        face: {
            title: 'Face & Motion Detection System',
            date: '2025 · Python, TensorFlow, OpenCV',
            fullDescription: `A real-time computer vision system that detects human faces and motion in live video streams. Built for low latency on a standard webcam feed, it combines Haar cascade classifiers for faces with background-subtraction motion detection.`,
            features: [
                'Real-time face detection using Haar cascades',
                'Motion detection with background-subtraction techniques',
                'Optimised frame handling for live camera feeds',
                'Lightweight enough to run on a laptop CPU',
                'OpenCV pipeline with a simple, deployable web demo'
            ],
            technologies: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision'],
            challenges: 'Keeping detection accurate across changing lighting conditions while holding frame rate high enough for a genuinely live experience.',
            outcome: 'A working real-time detector that processes camera feeds with minimal latency and is deployed as a live web demo.',
            links: [
                { label: 'View source on GitHub', url: 'https://github.com/Aaryaveeryadav/Face_detector', icon: 'fab fa-github' },
                { label: 'Open live demo', url: 'https://face-detector-eight.vercel.app', icon: 'fas fa-external-link-alt' }
            ]
        },
        weather: {
            title: 'Weather Forecast Web App',
            date: '2025 · HTML5, CSS3, JavaScript, OpenWeatherMap API',
            fullDescription: `A responsive weather application that fetches live data from the OpenWeatherMap API and presents a clean 5-day forecast. The UI reacts to the returned conditions, so the interface changes with the weather itself.`,
            features: [
                'Live weather data from the OpenWeatherMap API',
                'Interactive 5-day forecast view',
                'Location-based search for any city',
                'Dynamic UI states driven by weather conditions',
                'Fully responsive layout for mobile and desktop'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST API', 'Vercel'],
            challenges: 'Handling loading and error states for an external API gracefully, and shaping raw forecast JSON into a layout that is easy to scan.',
            outcome: 'A polished, deployed weather app with real-time data and a smooth experience across screen sizes.',
            links: [
                { label: 'Open live demo', url: 'https://weather-forecast-jade.vercel.app/', icon: 'fas fa-external-link-alt' },
                { label: 'View source on GitHub', url: 'https://github.com/Aaryaveeryadav/Weather-Forecast', icon: 'fab fa-github' }
            ]
        },
        skillswap: {
            title: 'SkillSwap — Skill Exchange Platform',
            date: '2024 – 2025 · React.js, TypeScript, Bolt AI',
            fullDescription: `A full-stack platform where people teach what they know and learn what they don't. Users create profiles around their skills, get matched with people who want to learn them, and send exchange requests — turning skill-sharing into a community rather than a marketplace.`,
            features: [
                'Matching of users by skills offered versus skills wanted',
                'Detailed user profiles with skill listings',
                'Search and filtering across the skill catalogue',
                'Exchange request flow between matched users',
                'Responsive interface built with React and TypeScript'
            ],
            technologies: ['React.js', 'TypeScript', 'Bolt AI', 'HTML5', 'CSS3'],
            challenges: 'Designing a matching model that feels useful with a small user base, and keeping the onboarding short enough that people actually list their skills.',
            outcome: 'A deployed platform that connects users for mutually beneficial skill exchanges.',
            links: [
                { label: 'Open live demo', url: 'https://skillswap-2hbq.vercel.app/', icon: 'fas fa-external-link-alt' },
                { label: 'View source on GitHub', url: 'https://github.com/Aaryaveeryadav/SkillSwap_Project_Final', icon: 'fab fa-github' }
            ]
        }
    };

    window.openModal = function(projectId) {
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');
        const project = projectDetails[projectId];

        if (!modal || !modalBody || !project) return;

        const linksHtml = project.links && project.links.length
            ? `<div class="modal-links">
                    ${project.links.map(link => `
                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i class="${link.icon}"></i> ${link.label}
                        </a>`).join('')}
               </div>`
            : '';

        modalBody.innerHTML = `
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-meta">${project.date}</p>
            ${linksHtml}

            <div class="modal-block">
                <h3>Overview</h3>
                <p>${project.fullDescription}</p>
            </div>

            <div class="modal-block">
                <h3>Key Features</h3>
                <ul class="modal-list">
                    ${project.features.map(feature => `
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <span>${feature}</span>
                        </li>`).join('')}
                </ul>
            </div>

            <div class="modal-block">
                <h3>Technologies Used</h3>
                <div class="modal-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>

            <div class="modal-block">
                <h3>Challenges &amp; Solutions</h3>
                <p>${project.challenges}</p>
            </div>

            <div class="modal-block">
                <h3>Outcome</h3>
                <p>${project.outcome}</p>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        const modal = document.getElementById('projectModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

/* ---------------- Certificates ---------------- */

function openCertificate(certId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) return;

    let content = '';
    if (certId === 'sql') {
        content = `
            <h2 class="modal-title">Microsoft SQL Certification</h2>
            <p class="modal-meta">Intellipaat · Aug 2025</p>
            <iframe src="assets/certificates/intellipaat-certificate.pdf"
                    title="Microsoft SQL Certification"
                    width="100%" height="600px"
                    style="border:none; border-radius:10px; background:#fff;"></iframe>`;
    } else if (certId === 'ai_ml') {
        content = `
            <h2 class="modal-title">Fundamentals in AI &amp; ML</h2>
            <p class="modal-meta">Vityarth</p>
            <img src="assets/certificates/vityarth-9b78f4a5af.png"
                 alt="Fundamentals in AI and ML certificate"
                 style="width:100%; border-radius:10px;">`;
    } else if (certId === 'python') {
        content = `
            <h2 class="modal-title">Python Essentials</h2>
            <p class="modal-meta">Vityarth</p>
            <img src="assets/certificates/vityarth-d878fcf4b7.png"
                 alt="Python Essentials certificate"
                 style="width:100%; border-radius:10px;">`;
    }

    if (!content) return;

    modalBody.innerHTML = content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/* ---------------- Background particles ---------------- */

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

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
