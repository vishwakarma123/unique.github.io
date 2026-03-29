document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Loader Animation ──
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 1,
                delay: 1.5,
                onComplete: () => loader.style.display = "none"
            });
        });

        // fallback preloader animation
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.transition = "0.5s";
            setTimeout(() => loader.style.display = "none", 500);
        }, 1500);
    }

    // ── 2. Custom Cursor Movement ──
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");
    const ring = document.getElementById("cursorRing");
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    if (dot && outline) {
        window.addEventListener("mousemove", e => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
            gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.3 });

            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        function animateRing() {
            if (ring) {
                ringX += (mouseX - ringX) * 0.12;
                ringY += (mouseY - ringY) * 0.12;
                ring.style.left = ringX + 'px';
                ring.style.top = ringY + 'px';
            }
            requestAnimationFrame(animateRing);
        }
        animateRing();

        document.querySelectorAll('a, button, .product-card, .cat-card, .flip-card').forEach(el => {
            if (ring) {
                el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
                el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
            }
        });
    }

    // ── 3. Navbar Scroll Effect ──
    const nav = document.getElementById("navbar") || document.querySelector(".luxury-nav");
    if (nav) {
        window.addEventListener("scroll", () => {
            nav.classList.toggle("scrolled", window.scrollY > 50);
            nav.classList.toggle("bg-white", window.scrollY > 50);
            nav.classList.toggle("shadow-sm", window.scrollY > 50);
        });
    }

    // ── 4. GSAP Reveal Animations ──
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) {
            gsap.from(heroTitle, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                delay: 2,
                ease: "power4.out"
            });
        }

        document.querySelectorAll(".reveal").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            });
        });
    }

    // ── VanillaTilt ──
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.05
        });
    }

    // ── AOS Init ──
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
    }

    // ── Scroll Progress ──
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = pct + '%';
        });
    }

    // ── Back to Top ──
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Gold Divider Reveal ──
    const dividers = document.querySelectorAll('.gold-divider');
    if (dividers.length) {
        const dividerObserver = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
        }, { threshold: 0.5 });
        dividers.forEach(d => dividerObserver.observe(d));
    }

    // ── Scroll Reveal Sections ──
    const revealSections = document.querySelectorAll('.reveal-section');
    if (revealSections.length) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    revealObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });
        revealSections.forEach(s => revealObserver.observe(s));
    }

    // ── Counter Animation ──
    function animateCounter(el) {
        const target = +el.dataset.target;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString() + (target >= 100 ? (target === 100 ? '%' : '+') : '+');
            if (current >= target) clearInterval(timer);
        }, 16);
    }

    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll('.stat-number').forEach(animateCounter);
                    counterObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        counterObserver.observe(statsStrip);
    }

    // ── Video Carousel Fix ──
    const carousel = document.getElementById('heroSlider');
    if (carousel) {
        carousel.addEventListener('slide.bs.carousel', function(event) {
            carousel.querySelectorAll('video').forEach(v => v.pause());
            const activeVideo = event.relatedTarget.querySelector('video');
            if (activeVideo) activeVideo.play();
        });
    }

const letters = document.querySelectorAll("#brandText span");
let index = 0;

// Step 1: Show letters one by one
function showLetters() {
    if (index < letters.length) {

        // skip space
        if (letters[index].classList.contains("space")) {
            index++;
            showLetters();
            return;
        }

        letters[index].classList.add("show");
        index++;

        setTimeout(showLetters, 50);
    } else {
        // Step 2: Combine effect
        setTimeout(() => {
            document.getElementById("brandText").classList.add("combine");
        }, 400);
    }
}

window.addEventListener("load", () => {
    showLetters();
});

// Should already exist in main.js — confirm it's there:
const cards = document.querySelectorAll('.product-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
cards.forEach(card => observer.observe(card));


});