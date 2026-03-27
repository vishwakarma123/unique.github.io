document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loader Animation
    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            delay: 1.5,
            onComplete: () => loader.style.display = "none"
        });
    });

    // 2. Custom Cursor Movement
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    // 3. Navbar Scroll Effect
    const nav = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled", "bg-white", "shadow-sm");
        } else {
            nav.classList.remove("scrolled", "bg-white", "shadow-sm");
        }
    });

    // 4. GSAP Reveal Animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 2,
        ease: "power4.out"
    });

    gsap.from(".reveal", {
        scrollTrigger: {
            trigger: ".reveal",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    });



window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "0.5s";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 1500); // show for 1.5 sec
});


window.addEventListener("scroll", function () {
    let nav = document.querySelector(".luxury-nav");
    nav.classList.toggle("scrolled", window.scrollY > 50);
});

    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05
    });


<script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>

});