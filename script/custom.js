gsap.registerPlugin(ScrollTrigger);

// -----------------------------------
// intro
// -----------------------------------

const wavePath = document.querySelector("#intro .intro_wave path");
const waveLength = wavePath.getTotalLength();

// wave 초기 상태
gsap.set(wavePath, {
  strokeDasharray: waveLength,
  strokeDashoffset: waveLength,
});

// logo 초기 상태
gsap.set("#intro .intro_logo", {
  opacity: 0,
});

// text1, text2 초기 상태
gsap.set(["#intro .intro_logo_text1", "#intro .intro_logo_text2"], {
  clipPath: "inset(0 100% 0 0)",
});

// intro timeline
const introTl = gsap.timeline();

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

  // text1, text2
  .to(
    ["#intro .intro_logo_text1", "#intro .intro_logo_text2"],
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.5,
      ease: "power2.inOut",
    },
    0,
  )

  // intro 전체 fade out
  .to("#intro", {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    delay: 0.5,
    onComplete: () => {
      gsap.set("#intro", {
        display: "none",
      });
    },
  });
