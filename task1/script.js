/* =========================================================
   KIRAN ACADEMY LANDING PAGE
   JavaScript
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeNavbar();

    initializeCounters();

    initializeCourseFilters();

    initializeFAQ();

    initializeTestimonials();

    initializeModalForms();

    initializeScrollReveal();

    initializeBackToTop();

    initializeYear();

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initializeNavigation() {

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const navMenu =
        document.getElementById("navMenu");

    if (!menuButton || !navMenu) return;


    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const icon =
            menuButton.querySelector("i");


        if (navMenu.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    /* Close menu after clicking a link */

    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                const icon =
                    menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            });

        });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function initializeNavbar() {

    const navbar =
        document.getElementById("navbar");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

        updateActiveNavigation();

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(".counter");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );


                    animateCounter(
                        counter,
                        target
                    );


                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* Counter helper */

function animateCounter(element, target) {

    const duration = 1800;

    const start = 0;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /* Smooth ease-out */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                start +
                (target - start) * eased
            );


        element.textContent =
            value.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent =
                target.toLocaleString();

        }

    }


    requestAnimationFrame(update);

}


/* =========================================================
   COURSE FILTERS
========================================================= */

function initializeCourseFilters() {

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const courseCards =
        document.querySelectorAll(".course-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            courseCards.forEach(card => {

                const category =
                    card.dataset.category;


                const shouldShow =
                    filter === "all" ||
                    category === filter;


                if (shouldShow) {

                    card.style.display = "";

                    setTimeout(() => {

                        card.style.opacity = "1";

                        card.style.transform =
                            "translateY(0)";

                    }, 20);

                } else {

                    card.style.opacity = "0";

                    card.style.transform =
                        "translateY(10px)";

                    setTimeout(() => {

                        card.style.display =
                            "none";

                    }, 250);

                }

            });

        });

    });

}


/* =========================================================
   FAQ ACCORDION
========================================================= */

function initializeFAQ() {

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");


        question.addEventListener("click", () => {

            const wasActive =
                item.classList.contains("active");


            /* Close all */

            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

            });


            /* Open clicked item */

            if (!wasActive) {

                item.classList.add("active");

            }

        });

    });

}


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

function initializeTestimonials() {

    const track =
        document.getElementById(
            "testimonialTrack"
        );

    const cards =
        document.querySelectorAll(
            ".testimonial-card"
        );

    const prevButton =
        document.getElementById(
            "prevReview"
        );

    const nextButton =
        document.getElementById(
            "nextReview"
        );

    const dots =
        document.querySelectorAll(
            ".slider-dot"
        );


    if (!track || !cards.length) return;


    let currentSlide = 0;


    function getVisibleSlides() {

        if (window.innerWidth <= 700) {

            return 1;

        }

        if (window.innerWidth <= 1000) {

            return 2;

        }

        return 3;

    }


    function getMaxSlide() {

        return Math.max(
            0,
            cards.length -
            getVisibleSlides()
        );

    }


    function updateSlider() {

        const visible =
            getVisibleSlides();


        const cardWidth =
            cards[0].getBoundingClientRect().width;


        const gap = 18;


        const move =
            currentSlide *
            (cardWidth + gap);


        track.style.transform =
            `translateX(-${move}px)`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    nextButton.addEventListener(
        "click",
        () => {

            const maxSlide =
                getMaxSlide();


            currentSlide++;

            if (currentSlide > maxSlide) {

                currentSlide = 0;

            }


            updateSlider();

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            const maxSlide =
                getMaxSlide();


            currentSlide--;

            if (currentSlide < 0) {

                currentSlide = maxSlide;

            }


            updateSlider();

        }
    );


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                currentSlide =
                    Math.min(
                        index,
                        getMaxSlide()
                    );

                updateSlider();

            }
        );

    });


    window.addEventListener(
        "resize",
        () => {

            currentSlide =
                Math.min(
                    currentSlide,
                    getMaxSlide()
                );

            updateSlider();

        }
    );


    /* Auto slide */

    setInterval(() => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            const maxSlide =
                getMaxSlide();


            currentSlide++;

            if (currentSlide > maxSlide) {

                currentSlide = 0;

            }


            updateSlider();

        }

    }, 5000);

}


/* =========================================================
   DEMO MODAL
========================================================= */

function openDemoModal() {

    const modal =
        document.getElementById(
            "demoModal"
        );


    modal.classList.add("show");

    document.body.classList.add(
        "modal-open"
    );


    const form =
        document.getElementById(
            "demoForm"
        );

    const success =
        document.getElementById(
            "successMessage"
        );


    form.style.display = "flex";

    success.classList.remove("show");

}


function closeDemoModal() {

    const modal =
        document.getElementById(
            "demoModal"
        );


    modal.classList.remove("show");

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   COURSE MODAL
========================================================= */

function openCourseModal(courseName) {

    const modal =
        document.getElementById(
            "courseModal"
        );


    const title =
        document.getElementById(
            "courseModalTitle"
        );


    title.textContent =
        courseName;


    modal.classList.add("show");

    document.body.classList.add(
        "modal-open"
    );

}


function closeCourseModal() {

    const modal =
        document.getElementById(
            "courseModal"
        );


    modal.classList.remove("show");

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   FORM SUBMISSION
========================================================= */

function initializeModalForms() {

    const form =
        document.getElementById(
            "demoForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const course =
                document.getElementById(
                    "course"
                ).value;


            if (!name) {

                showToast(
                    "Please enter your name."
                );

                return;

            }


            if (!/^[0-9]{10}$/.test(phone)) {

                showToast(
                    "Enter a valid 10-digit mobile number."
                );

                return;

            }


            if (!email ||
                !email.includes("@")) {

                showToast(
                    "Please enter a valid email."
                );

                return;

            }


            if (!course) {

                showToast(
                    "Please select a course."
                );

                return;

            }


            /*

                This is frontend-only.

                In a real project you can send
                the form data to:

                - PHP
                - Node.js / Express
                - Firebase
                - Google Sheets API
                - Formspree
                - EmailJS

            */


            form.style.display = "none";


            const success =
                document.getElementById(
                    "successMessage"
                );


            success.classList.add(
                "show"
            );


            showToast(
                "Demo request submitted!"
            );


            form.reset();

        }
    );

}


/* =========================================================
   ESC KEY - CLOSE MODALS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        closeDemoModal();

        closeCourseModal();

    }
);


/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

document.addEventListener(
    "click",
    event => {

        const demoModal =
            document.getElementById(
                "demoModal"
            );

        const courseModal =
            document.getElementById(
                "courseModal"
            );


        if (
            event.target === demoModal
        ) {

            closeDemoModal();

        }


        if (
            event.target === courseModal
        ) {

            closeCourseModal();

        }

    }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".section-heading, .course-card, .why-card, .timeline-item, .testimonial-card, .faq-item"
        );


    elements.forEach(element => {

        element.classList.add("reveal");

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 500
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   PHONE INPUT
========================================================= */

const phoneInput =
    document.getElementById("phone");


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        () => {

            phoneInput.value =
                phoneInput.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        }
    );

}


/* =========================================================
   SMOOTH ANCHOR HANDLING
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#" ||
                    !targetId
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });


/* =========================================================
   CURSOR MICRO-INTERACTION
========================================================= */

document
    .querySelectorAll(
        ".course-card, .why-card"
    )
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) /
                    80;


                const rotateY =
                    (centerX - x) /
                    80;


                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });