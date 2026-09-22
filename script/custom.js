gsap.registerPlugin(ScrollTrigger);

/* ===================================
   INTRO
=================================== */

// true  = 인트로 스킵
// false = 인트로 실행
const introSkip = true;

if (introSkip) {
  // 인트로 제거
  gsap.set("#intro", {
    display: "none",
  });

  // 헤더 정상 위치
  gsap.set("header", {
    yPercent: 0,
  });

  // 스크롤 허용
  document.body.style.overflow = "auto";

  // 비주얼 애니메이션 실행
  initVisualScroll();

  ScrollTrigger.refresh();
} else {
  // 인트로 실행 중 스크롤 방지
  document.body.style.overflow = "hidden";

  const wavePath = document.querySelector("#intro .intro_wave path");
  const waveLength = wavePath.getTotalLength();

  // 초기 상태
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

  // 인트로 타임라인
  const introTl = gsap.timeline();

  introTl
    // 물결선
    .to(
      wavePath,
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
      },
      0,
    )

    // 로고
    .to(
      "#intro .intro_logo",
      {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      },
      0,
    )

    // 로고 텍스트
    .to(
      ["#intro .intro_logo_text1", "#intro .intro_logo_text2"],
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.5,
        ease: "power2.inOut",
      },
      0,
    )

    // 인트로 사라짐
    .to("#intro", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      delay: 0.2,

      onComplete: () => {
        gsap.set("#intro", {
          display: "none",
        });

        document.body.style.overflow = "auto";

        initVisualScroll();

        ScrollTrigger.refresh();
      },
    })

    // 헤더 내려오기
    .to(
      "header",
      {
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
      },
      "<0.3",
    );
}

/* ===================================
   VISUAL SCROLL
=================================== */

function initVisualScroll() {
  const visualTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".visual_pin",
      start: "20% top",
      end: "bottom bottom",
      scrub: 1,

      // 작업 끝나면 false
      // markers: true,
    },
  });

  visualTl

    // 메인 비디오 확대
    .to("#visual .video_wrap", {
      width: "100%",
      height: "calc(100vh - 80px)",
      duration: 1,
      ease: "none",
    })

    // 주변 카드 사라짐
    .to(
      "#visual .visual_card li",
      {
        opacity: 0,
        duration: 0.3,
        ease: "none",
      },
      0.7,
    )

    // 비디오 확대 완료 후 스크롤 유예시간
    .to(
      {},
      {
        duration: 0.5,
      },
    );
}

/* ===================================
   SECTION 1
   PEACH BEACH TEXT REVEAL
=================================== */

gsap.fromTo(
  "#section1 .mainText h2 span",

  {
    clipPath: "inset(0 100% 0 0)",
  },

  {
    clipPath: "inset(0 0% 0 0)",
    duration: 1.5,
    ease: "power2.inOut",

    scrollTrigger: {
      trigger: "#section1 .mainText h2",
      start: "top 80%",
      toggleActions: "play none none reverse",

      // 작업 끝나면 false
      // markers: true,
    },
  },
);

/* ===================================
   SECTION 2
   TITLE REVEAL
=================================== */

gsap.to("#section2 .section_tit .tit_fill", {
  clipPath: "inset(0 0% 0 0)",
  ease: "none",

  scrollTrigger: {
    trigger: "#section2",
    start: "50% 70%",
    end: "top 20%",
    scrub: 1,
    markers: true,
  },
});

/* ===================================
   SECTION 2
   ROOMS MAIN SLIDE
=================================== */

const roomMain = document.querySelectorAll("#section2 .rooms_main");

roomMain.forEach((roomMain) => {
  const roomSlides = roomMain.querySelectorAll("ul li");

  const roomPrev = roomMain.querySelector(".rooms_main_nav .prev");
  const roomNext = roomMain.querySelector(".rooms_main_nav .next");

  const roomCurrent = roomMain.querySelector(".current");
  const roomTotal = roomMain.querySelector(".total");
  const roomProgress = roomMain.querySelector(".progress_bar span");

  let roomSlideIndex = 0;

  const roomSlideTotal = roomSlides.length;

  // 총 슬라이드 수 표시
  roomTotal.textContent = String(roomSlideTotal).padStart(2, "0");

  // 슬라이드 변경
  function changeRoomSlide() {
    roomSlides.forEach((slide) => {
      slide.classList.remove("on");
    });

    roomSlides[roomSlideIndex].classList.add("on");

    // 현재 번호
    roomCurrent.textContent = String(roomSlideIndex + 1).padStart(2, "0");

    // progress bar
    roomProgress.style.width = `${((roomSlideIndex + 1) / roomSlideTotal) * 100}%`;
  }

  // NEXT
  roomNext.addEventListener("click", () => {
    roomSlideIndex++;

    if (roomSlideIndex >= roomSlideTotal) {
      roomSlideIndex = 0;
    }

    changeRoomSlide();
  });

  // PREV
  roomPrev.addEventListener("click", () => {
    roomSlideIndex--;

    if (roomSlideIndex < 0) {
      roomSlideIndex = roomSlideTotal - 1;
    }

    changeRoomSlide();
  });

  // 초기 상태
  changeRoomSlide();
});

/* ===================================
   SECTION 2
   ROOMS CHANGE
=================================== */

const rooms = document.querySelectorAll("#section2 .rooms");

const bg1 = document.querySelector("#section2 .bg1");
const bg2 = document.querySelector("#section2 .bg2");

const roomBackgrounds = [
  "img/section2_bg1.jpg",
  "img/section2_bg2.jpg",
  "img/section2_bg3.jpg",
  "img/section2_bg4.jpg",
];

let roomIndex = 0;
let activeBg = bg1;

// 초기 배경
bg1.style.backgroundImage = `url("${roomBackgrounds[0]}")`;

// 객실 변경
function changeRoom(changeBackground = true) {
  rooms.forEach((room) => {
    room.classList.remove("on");
  });

  // 현재 객실 표시
  rooms[roomIndex].classList.add("on");

  // 객실 번호
  const roomNumber = rooms[roomIndex].querySelector(
    ".rooms_intro .room_number",
  );

  roomNumber.textContent = `${String(roomIndex + 1).padStart(2, "0")} / ${String(rooms.length).padStart(2, "0")}`;

  // 배경 변경
  if (changeBackground) {
    const nextBg = activeBg === bg1 ? bg2 : bg1;

    nextBg.style.backgroundImage = `url("${roomBackgrounds[roomIndex]}")`;

    gsap.set(nextBg, {
      opacity: 0,
    });

    gsap.to(nextBg, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
    });

    gsap.to(activeBg, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });

    activeBg = nextBg;
  }
}

// 객실 PREV / NEXT
rooms.forEach((room) => {
  const prev = room.querySelector(".rooms_intro .rooms_nav .prev");
  const next = room.querySelector(".rooms_intro .rooms_nav .next");

  // NEXT
  next.addEventListener("click", () => {
    roomIndex++;

    if (roomIndex >= rooms.length) {
      roomIndex = 0;
    }

    changeRoom();
  });

  // PREV
  prev.addEventListener("click", () => {
    roomIndex--;

    if (roomIndex < 0) {
      roomIndex = rooms.length - 1;
    }

    changeRoom();
  });
});

// 초기 상태
changeRoom(false);
