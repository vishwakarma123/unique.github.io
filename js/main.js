
/* ── SAFE HELPERS ── */
function safeEl(id) { return document.getElementById(id); }
function safeQuery(sel) { return document.querySelector(sel); }

document.addEventListener("DOMContentLoaded", function () {

  function loadHTML(id, file, callback) {
    fetch(file)
      .then(res => res.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
        if (callback) callback();
      })
      .catch(err => console.log("Error loading:", err));
  }

  // Load header first, then run navbar JS
  loadHTML("header", "header.html", function () {
    initNavbar(); // run AFTER header loads
  });

  // Load footer
  loadHTML("footer", "footer.html");

});


/* =========================
   NAVBAR FUNCTION
========================= */
function initNavbar() {
  const nav = document.querySelector("#mainNav");

  if (!nav) return; // IMPORTANT (prevents crash)

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

/* ── REGISTER GSAP PLUGINS ── */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ── SAFE ELEMENT REFS ── */


document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Loader Animation ──
    const loader = document.getElementById("loader");
    if (loader) {
        // Primary: Hide after window load + delay
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.transition = "opacity 0.8s ease";
                setTimeout(() => {
                    loader.style.display = "none";
                    loader.style.visibility = "hidden";
                }, 800);
            }, 1500);
        });

        // Fallback: Force hide after 3 seconds regardless
        setTimeout(() => {
            if (loader && loader.style.display !== "none") {
                loader.style.opacity = "0";
                loader.style.transition = "opacity 0.5s ease";
                setTimeout(() => {
                    loader.style.display = "none";
                    loader.style.visibility = "hidden";
                }, 500);
            }
        }, 3000);
    }



    // const nav = document.getElementById('mainNav');
    // window.addEventListener('scroll', () => {
    //     nav.classList.toggle('scrolled', window.scrollY > 60);
    // });

    const cursorDot  = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

if (cursorDot && cursorRing) {
    window.addEventListener("mousemove", (e) => {
        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top  = e.clientY + "px";

        // optional smooth ring movement
        let ringX = 0, ringY = 0;
        ringX += (e.clientX - ringX) * 0.12;
        ringY += (e.clientY - ringY) * 0.12;
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top  = ringY + "px";
    });

    document.querySelectorAll("a, button, .product-card, .cat-card, .flip-card")
        .forEach(el => {
            el.addEventListener("mouseenter", () => cursorRing.classList.add("hovered"));
            el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovered"));
        });
}



    const cursor = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");

if (cursor && ring) {
    window.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        // Example ring animation
        ring.style.left = e.clientX + "px";
        ring.style.top = e.clientY + "px";
    });
}
    // ── 4. GSAP Reveal Animations ──
    // if (typeof gsap !== 'undefined') {
    //     gsap.registerPlugin(ScrollTrigger);

    //     const heroTitle = document.querySelector(".hero-title");
    //     if (heroTitle) {
    //         gsap.from(heroTitle, {
    //             y: 100,
    //             opacity: 0,
    //             duration: 1.2,
    //             delay: 2,
    //             ease: "power4.out"
    //         });
    //     }

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

    window.addEventListener("load", () => {
        const letters = document.querySelectorAll("#brandText span");
        let index = 0;

        function showLetters() {
            if (!letters || letters.length === 0) return;

            if (index < letters.length) {
                // skip space safely
                if (letters[index] && letters[index].classList.contains("space")) {
                    index++;
                    showLetters();
                    return;
                }

                if (letters[index]) {
                    letters[index].classList.add("show");
                }

                index++;
                setTimeout(showLetters, 50);
            } else {
                // Animation complete - safe check for brandText
                const brand = document.getElementById("brandText");
                if (brand) {
                    setTimeout(() => {
                        brand.classList.add("combine");
                    }, 400);
                }
            }
        }

        // Run letters animation if they exist
        if (letters.length > 0) {
            showLetters();
        }
    });

    // Product cards observer
    const cards = document.querySelectorAll('.product-card');
    if (cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(card => observer.observe(card));
    }

});


/* ═══════════════════════════════════════════════════════════════
   PHASE 2 & 3: MODERN ENHANCEMENTS
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Dark Mode Toggle ──
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Check for saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // ── 2. Scroll Reveal Animation ──
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ── 3. Lazy Loading Images with Shimmer Effect ──
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { threshold: 0.1 });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ── 4. Lightbox Gallery ──
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    if (lightboxTriggers.length > 0) {
        // Create lightbox HTML
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
                <img src="" alt="Gallery Image">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = trigger.getAttribute('href') || trigger.getAttribute('data-src');
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ── 5. Newsletter Popup ──
    const newsletterPopup = document.getElementById('newsletterPopup');
    if (newsletterPopup) {
        // Show after 5 seconds
        setTimeout(() => {
            if (!localStorage.getItem('newsletterClosed')) {
                newsletterPopup.classList.add('active');
            }
        }, 5000);

        // Close button
        const closeBtn = newsletterPopup.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                newsletterPopup.classList.remove('active');
                localStorage.setItem('newsletterClosed', 'true');
            });
        }

        // Close on overlay click
        newsletterPopup.addEventListener('click', (e) => {
            if (e.target === newsletterPopup) {
                newsletterPopup.classList.remove('active');
                localStorage.setItem('newsletterClosed', 'true');
            }
        });
    }

    // ── 6. Sticky Announcement Bar ──
    const announcementBar = document.getElementById('announcementBar');
    if (announcementBar) {
        // Show after scrolling down a bit
        let showed = false;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200 && !showed) {
                announcementBar.classList.add('visible');
                showed = true;
            }
        });

        // Close button
        const closeBtn = announcementBar.querySelector('.announcement-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                announcementBar.classList.remove('visible');
            });
        }
    }

    // ── 7. Button Ripple Effect ──
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    if (!document.getElementById('rippleStyles')) {
        const style = document.createElement('style');
        style.id = 'rippleStyles';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ── 8. Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── 9. 3D Card Tilt Effect ──
    const cards3D = document.querySelectorAll('.card-3d');
    cards3D.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // ── 10. Page Transition ──
    document.body.classList.add('page-transition');

});

/* ── END OF MODERN ENHANCEMENTS ── */