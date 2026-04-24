/* ========================================
   LEADMATCH® - SCRIPT.JS
   All JS Functionality & Animations
======================================== */

/* ========================================
   1. HEADER SCROLL EFFECT
======================================== */
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header_section");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* ========================================
   2. BACK TO TOP BUTTON
======================================== */
document.addEventListener("DOMContentLoaded", function () {

    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* ========================================
       4. TESTIMONIALS SWIPER
    ======================================== */
    const testimonialsSwiper = new Swiper(".testimonials_swiper", {
        slidesPerView: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
    });

    /* ========================================
       5. ACTIVE NAV LINK ON SCROLL
    ======================================== */
    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".header_section .nav-link");

    function updateActiveNav() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href && href.includes(current)) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    /* ========================================
       6. SMOOTH SCROLL FOR ANCHOR LINKS
    ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: targetTop, behavior: "smooth" });

                // Close mobile navbar if open
                const navbarCollapse = document.getElementById("navbarSupportedContent");
                if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                    const toggler = document.querySelector(".navbar-toggler");
                    if (toggler) toggler.click();
                }
            }
        });
    });

    /* ========================================
       8. STATS COUNTER ANIMATION
    ======================================== */
    const statNumbers = document.querySelectorAll(".stat_number");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    function animateCounter(element) {
        const text = element.textContent;
        const match = text.match(/[\d.]+/);
        if (!match) return;

        const numStr = match[0];
        const hasDecimal = numStr.includes(".");
        const target = parseFloat(numStr);
        const prefix = text.split(numStr)[0] || "";
        const suffix = text.split(numStr)[1] || "";
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = hasDecimal
                ? (eased * target).toFixed(1)
                : Math.floor(eased * target);
            element.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    /* ========================================
       9. CARD HOVER TILT EFFECT
    ======================================== */
    const tiltCards = document.querySelectorAll(".service_card");

    tiltCards.forEach(card => {
        card.addEventListener("mousemove", function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
            card.style.transition = "transform 0.5s ease";
        });
    });

    /* ========================================
       10. SHAKE KEYFRAME (injected)
    ======================================== */
    const shakeStyle = document.createElement("style");
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
        }
    `;
    document.head.appendChild(shakeStyle);

});