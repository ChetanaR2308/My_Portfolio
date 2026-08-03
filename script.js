// ==========================================================
// CHETANA RANGU — PORTFOLIO JAVASCRIPT
// ==========================================================

"use strict";


// ==========================================================
// DOM ELEMENTS
// ==========================================================

const navbar =
  document.querySelector(".navbar");


const navLinks =
  document.querySelectorAll(
    "nav a[href^='#']"
  );


const sections =
  document.querySelectorAll(
    "section[id]"
  );


const fadeElements =
  document.querySelectorAll(
    ".fade-in"
  );


const bgGrid =
  document.querySelector(
    ".bg-grid"
  );


const heroCard =
  document.querySelector(
    ".hero-card"
  );


const projectRows =
  document.querySelectorAll(
    ".project-row"
  );


const skillGroups =
  document.querySelectorAll(
    ".skill-group"
  );


// ==========================================================
// REDUCED MOTION
// ==========================================================

const motionQuery =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


let prefersReducedMotion =
  motionQuery.matches;


motionQuery.addEventListener?.(
  "change",
  event => {

    prefersReducedMotion =
      event.matches;

  }
);


// ==========================================================
// NAVBAR SCROLL EFFECT
// ==========================================================

function updateNavbar() {

  if (!navbar) return;


  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 45
  );

}


// ==========================================================
// BACKGROUND PARALLAX
// ==========================================================

function updateGridParallax() {

  if (
    !bgGrid ||
    prefersReducedMotion
  ) {
    return;
  }


  const scrollY =
    window.scrollY;


  bgGrid.style.backgroundPosition =
    `0 ${scrollY * 0.12}px`;

}


// ==========================================================
// OPTIMIZED SCROLL HANDLER
// ==========================================================

let scrollTicking = false;


function handleScroll() {

  if (scrollTicking) {
    return;
  }


  scrollTicking = true;


  requestAnimationFrame(() => {

    updateNavbar();

    updateGridParallax();

    scrollTicking = false;

  });

}


window.addEventListener(

  "scroll",

  handleScroll,

  {
    passive: true
  }

);


handleScroll();


// ==========================================================
// SCROLL REVEAL
// ==========================================================

if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {


  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "visible"
          );


          observer.unobserve(
            entry.target
          );

        });

      },


      {
        threshold: 0.10,

        rootMargin:
          "0px 0px -50px 0px"
      }

    );


  fadeElements.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );

}

else {


  fadeElements.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );

}


// ==========================================================
// ACTIVE NAVIGATION SECTION
// ==========================================================

function setActiveLink(sectionId) {

  navLinks.forEach(link => {

    const href =
      link.getAttribute("href");


    link.classList.toggle(
      "active",
      href === `#${sectionId}`
    );

  });

}


if (
  "IntersectionObserver" in window
) {


  const sectionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          setActiveLink(
            entry.target.id
          );

        });

      },


      {
        rootMargin:
          "-30% 0px -60% 0px",

        threshold: 0
      }

    );


  sections.forEach(
    section => {

      sectionObserver.observe(
        section
      );

    }
  );

}


// ==========================================================
// SMOOTH NAVIGATION
// ==========================================================
//
// IMPORTANT:
// Scroll to the section HEADING rather than the
// invisible top boundary of the entire section.
//
// This fixes the problem where "Achievements",
// "Projects", etc. appeared in the middle of
// the screen after clicking the navbar.
// ==========================================================

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(anchor => {


    anchor.addEventListener(
      "click",
      function (event) {


        const href =
          this.getAttribute("href");


        if (
          !href ||
          href === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            href
          );


        if (!target) {

          return;

        }


        event.preventDefault();


        // Find section heading

        const heading =
          target.querySelector(
            ".section-head"
          ) || target;


        // Current navbar height

        const navbarHeight =
          navbar
            ? navbar.offsetHeight
            : 0;


        // Position heading below navbar

        const targetPosition =

          heading
            .getBoundingClientRect()
            .top

          +

          window.scrollY

          -

          navbarHeight

          -

          22;


        window.scrollTo({

          top:
            Math.max(
              targetPosition,
              0
            ),

          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth"

        });


        // Immediately update active nav

        if (target.id) {

          setActiveLink(
            target.id
          );

        }

      }

    );

  });


// ==========================================================
// PROJECT MOUSE GLOW
// ==========================================================

projectRows.forEach(
  project => {


    project.addEventListener(
      "mousemove",
      event => {


        if (
          window.innerWidth <= 768 ||
          prefersReducedMotion
        ) {

          return;

        }


        const rect =
          project.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        const xPercent =
          (x / rect.width) * 100;


        const yPercent =
          (y / rect.height) * 100;


        project.style.background = `

          radial-gradient(
            circle at
            ${xPercent}%
            ${yPercent}%,

            rgba(
              232,
              163,
              61,
              0.06
            ),

            transparent 34%
          ),

          var(--bg-alt)

        `;

      }

    );


    project.addEventListener(
      "mouseleave",
      () => {


        project.style.background =
          "";

      }

    );

  }
);


// ==========================================================
// HERO CARD SUBTLE TILT
// ==========================================================

if (heroCard) {


  heroCard.addEventListener(
    "mousemove",
    event => {


      if (
        window.innerWidth <= 768 ||
        prefersReducedMotion
      ) {

        return;

      }


      const rect =
        heroCard
          .getBoundingClientRect();


      const mouseX =
        event.clientX -
        rect.left;


      const mouseY =
        event.clientY -
        rect.top;


      const centerX =
        rect.width / 2;


      const centerY =
        rect.height / 2;


      const rotateY =

        (
          (mouseX - centerX)
          /
          centerX
        )

        * 1.5;


      const rotateX =

        (
          (mouseY - centerY)
          /
          centerY
        )

        * -1.5;


      heroCard.style.transform = `

        perspective(900px)

        translateY(-5px)

        rotateX(${rotateX}deg)

        rotateY(${rotateY}deg)

      `;

    }

  );


  heroCard.addEventListener(
    "mouseleave",
    () => {


      heroCard.style.transform =
        "";

    }

  );

}


// ==========================================================
// SKILL CARD STAGGER
// ==========================================================

skillGroups.forEach(
  (card, index) => {


    card.style.transitionDelay =
      `${index * 20}ms`;

  }
);


// ==========================================================
// EXTERNAL LINK SECURITY
// ==========================================================

document
  .querySelectorAll(
    'a[target="_blank"]'
  )
  .forEach(link => {


    const existingRel =
      link.getAttribute("rel")
      || "";


    const relValues =
      new Set(

        existingRel
          .split(" ")
          .filter(Boolean)

      );


    relValues.add(
      "noopener"
    );


    relValues.add(
      "noreferrer"
    );


    link.setAttribute(

      "rel",

      [...relValues]
        .join(" ")

    );

  });


// ==========================================================
// HANDLE RESIZE
// ==========================================================

let resizeTimer;


window.addEventListener(
  "resize",
  () => {


    clearTimeout(
      resizeTimer
    );


    resizeTimer =
      setTimeout(
        () => {


          // Reset transforms when
          // switching to mobile

          if (
            window.innerWidth <= 768
          ) {


            if (heroCard) {

              heroCard.style.transform =
                "";

            }


            projectRows.forEach(
              project => {

                project.style.background =
                  "";

              }
            );

          }

        },

        150
      );

  }
);


// ==========================================================
// PAGE LOAD
// ==========================================================

window.addEventListener(
  "load",
  () => {


    document.body
      .classList.add(
        "loaded"
      );


    updateNavbar();


    // If page loads directly with #projects,
    // #achievements, etc.

    if (
      window.location.hash
    ) {


      const target =
        document.querySelector(
          window.location.hash
        );


      if (target) {


        setTimeout(
          () => {


            const heading =
              target.querySelector(
                ".section-head"
              ) || target;


            const navbarHeight =
              navbar
                ? navbar.offsetHeight
                : 0;


            const position =

              heading
                .getBoundingClientRect()
                .top

              +

              window.scrollY

              -

              navbarHeight

              -

              22;


            window.scrollTo({

              top:
                Math.max(
                  position,
                  0
                ),

              behavior: "auto"

            });

          },

          50
        );

      }

    }

  }
);
