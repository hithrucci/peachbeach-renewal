gsap.registerPlugin(ScrollTrigger);

// -----------------------------------
// visual scroll
// -----------------------------------

function initVisualScroll() {
  const visualTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#visual",
      start: "top top",
      end: "+=1500",
      scrub: 1,
      //   markers: true,
    },
  });

  visualTl
    .to("#visual .video_wrap", {
      width: "100%",
      height: "calc(100vh - 80px)",
      duration: 1,
      ease: "none",
    })
    .to(
      "#visual .visual_card li",
      {
        opacity: 0,
        duration: 0.3,
        ease: "none",
      },
      0.7,
    )
    .to(
      {},
      {
        duration: 1.5,
      },
    );
}

// -----------------------------------
// intro
// -----------------------------------

const introSkip = false;

if (introSkip) {
  gsap.set("#intro", {
    display: "none",
  });

  document.body.style.overflow = "auto";

  gsap.set("#visual .visual_card li", {
    opacity: 1,
  });

  initVisualScroll();
} else {
  const wavePath = document.querySelector("#intro .intro_wave path");
  const waveLength = wavePath.getTotalLength();

  gsap.set(wavePath, {
    strokeDasharray: waveLength,
    strokeDashoffset: waveLength,
  });

  gsap.set("#intro .intro_logo", {
    opacity: 0,
  });

  gsap.set(["#intro .intro_logo_text1", "#intro .intro_logo_text2"], {
    clipPath: "inset(0 100% 0 0)",
  });

  gsap.set("header", {
    yPercent: -100,
  });

  gsap.set("#visual .visual_card li", {
    opacity: 0,
  });

  const introTl = gsap.timeline({
    onComplete: () => {
      gsap.set("#intro", {
        display: "none",
      });

      document.body.style.overflow = "auto";

      initVisualScroll();
    },
  });

  introTl

    // wave
    .to(
      wavePath,
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
      },
      0,
    )

    // logo
    .to(
      "#intro .intro_logo",
      {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      },
      0,
    )

    // logo text
    .to(
      ["#intro .intro_logo_text1", "#intro .intro_logo_text2"],
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: "power2.inOut",
      },
      0,
    )

    // intro 사라짐
    .to("#intro", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      delay: 0.2,
    })

    // header 등장
    .to(
      "header",
      {
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
      },
      "<0.3",
    )

    .to(
      "#visual .visual_card li",
      {
        opacity: 1,
        duration: 1,
        stagger: {
          each: 0.3,
          from: "random",
        },
        ease: "power2.out",
      },
      "<",
    );
}
// -----------------------------------
// section1
// -----------------------------------

gsap.fromTo(
  "#section1 .mainText h2 span",
  {
    clipPath: "inset(0 100% 0 0)",
  },
  {
    clipPath: "inset(0 0% 0 0)",
    duration: 3,
    ease: "power3.inOut",

    scrollTrigger: {
      trigger: "#section1 .mainText h2",
      start: "top 70%",
      toggleActions: "play none none reverse",
      markers: true,
    },
  },
);
