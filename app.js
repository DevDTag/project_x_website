document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. DYNAMIC CYBER NODE CANVAS BACKGROUND ANIMATION
    // -------------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const numNodes = 35;
        const nodes = [];
        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                radius: Math.random() * 2 + 1.5
            });
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            const theme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nodeColor = theme === 'dark' ? 'rgba(168, 85, 247, 0.6)' : 'rgba(147, 51, 234, 0.5)';
            const lineColor = theme === 'dark' ? 'rgba(217, 70, 239, ' : 'rgba(192, 132, 252, ';

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor;
                ctx.fill();

                for (let j = i + 1; j < nodes.length; j++) {
                    const node2 = nodes[j];
                    const dist = Math.hypot(node2.x - node.x, node2.y - node.y);
                    const maxDist = 170;
                    
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(node2.x, node2.y);
                        ctx.strokeStyle = lineColor + alpha + ')';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    // -------------------------------------------------------------
    // 2. DARK MODE / LIGHT MODE TOGGLE (☀️ Sun / 🌙 Moon)
    // -------------------------------------------------------------
    const modeBtn = document.getElementById('mode-toggle');
    const modeIcon = document.getElementById('mode-icon');

    if (modeBtn) {
        modeBtn.addEventListener('click', () => {
            const currentMode = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextMode = currentMode === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', nextMode);
            modeIcon.textContent = nextMode === 'dark' ? '🌙' : '☀️';
            modeBtn.setAttribute('title', nextMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        });
    }

    // -------------------------------------------------------------
    // 3. HERO IMAGE SHOWCASE SLIDER (FADE TRANSITION & AUTO 5s LOOP)
    // -------------------------------------------------------------
    const sliderImgs = document.querySelectorAll('.slider-img');
    const counterEl = document.getElementById('slider-counter');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    
    let currentIndex = 0;
    let autoSlideTimer = null;

    function updateSlider(index) {
        sliderImgs.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
        if (counterEl) {
            counterEl.textContent = `${index + 1}/${sliderImgs.length}`;
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % sliderImgs.length;
        updateSlider(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + sliderImgs.length) % sliderImgs.length;
        updateSlider(currentIndex);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(nextSlide, 5000); // 5 Seconds Loop
    }

    function stopAutoSlide() {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    if (nextBtn && prevBtn && sliderImgs.length > 0) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Reset 5s timer on manual click
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Reset 5s timer on manual click
        });

        startAutoSlide();
    }

    // -------------------------------------------------------------
    // 4. FEATURE TABS SWITCHER
    // -------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // -------------------------------------------------------------
    // 5. FAQ ACCORDION TOGGLE
    // -------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------
    // 6. PURCHASE MODAL TRIGGER & PLAN SELECTION
    // -------------------------------------------------------------
    const buyBtns = document.querySelectorAll('.buy-btn');
    const modal = document.getElementById('purchase-modal');
    const modalClose = document.getElementById('modal-close');
    const modalPlanName = document.getElementById('modal-plan-name');

    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan') || 'Monthly VIP Pass ($60 USD)';
            if (modalPlanName) modalPlanName.textContent = `Selected Plan: ${plan}`;
            if (modal) modal.classList.add('active');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // -------------------------------------------------------------
    // 7. NAVBAR HARD FIX - CUSTOM requestAnimationFrame SMOOTH SCROLL SLIDER
    // -------------------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
    const sections = document.querySelectorAll('section');

    function hardSmoothScrollTo(targetElement, duration = 650) {
        const headerOffset = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Cubic Ease-In-Out Easing Function for buttery smooth sliding
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animationStep(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animationStep);
            }
        }

        requestAnimationFrame(animationStep);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    hardSmoothScrollTo(targetElement, 700); // 700ms smooth slide
                }
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.classList.contains('nav-link')) {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 8. REALISTIC DYNAMIC "LAST PATCH CHECK" SIMULATION ENGINE
    // -------------------------------------------------------------
    const patchCheckEl = document.getElementById('patch-check-time');
    
    if (patchCheckEl) {
        // Base elapsed minutes offset (random between 4 to 12 mins on page load)
        let elapsedMinutes = Math.floor(Math.random() * 9) + 4;
        
        function formatTimeAgo(minutes) {
            if (minutes <= 1) {
                return "Just Now";
            } else if (minutes < 60) {
                return `${minutes} Minutes Ago`;
            } else {
                const hours = Math.floor(minutes / 60);
                const remMin = minutes % 60;
                if (hours === 1 && remMin === 0) {
                    return `1 Hour Ago`;
                } else if (remMin === 0) {
                    return `${hours} Hours Ago`;
                } else {
                    return `${hours}h ${remMin}m Ago`;
                }
            }
        }

        function updatePatchCheckDisplay() {
            patchCheckEl.textContent = formatTimeAgo(elapsedMinutes);
        }

        // Initial render
        updatePatchCheckDisplay();

        // 1) Incremental Minute Timer (Every 60 Seconds, increase elapsed minutes by 1)
        setInterval(() => {
            elapsedMinutes += 1;
            updatePatchCheckDisplay();
        }, 60000); // 60s = 1 min real-time

        // 2) Live Automated Cloud Check Simulation (Random check every 45s - 90s)
        function scheduleCloudCheck() {
            const nextCheckMs = Math.floor(Math.random() * 45000) + 45000; // 45s to 90s
            setTimeout(() => {
                // Simulate cloud check completion -> Reset time back to "Just Now" or 1-2 mins!
                patchCheckEl.style.opacity = '0.3';
                setTimeout(() => {
                    elapsedMinutes = 0; // Reset time -> "Just Now"
                    updatePatchCheckDisplay();
                    patchCheckEl.style.opacity = '1';
                }, 400);
                
                // Re-schedule next random cloud check
                scheduleCloudCheck();
            }, nextCheckMs);
        }

        // Start cloud check simulator
        scheduleCloudCheck();
    }
});
