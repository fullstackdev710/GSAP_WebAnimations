const squares = gsap.utils.toArray(".js-imgs");
const links = document.querySelectorAll(".dream");
const viewMax = {};
const pad = 10;
const coords = {
  mouseX: 0,
  mouseY: 0,
};

const onResize = () => {
  viewMax.x = window.innerWidth - pad;
  viewMax.y = window.innerHeight - pad;
};

const updateMousePosition = (e) => {
  coords.mouseX = e.clientX;
  coords.mouseY = e.clientY;
};

const tweenProperty = (target, prop) => {
  gsap.to(target, {
    duration: "random(9,10)",
    [prop]: `random(${pad},${viewMax[prop]})`,
    ease: "sine.inOut",
    onComplete: tweenProperty,
    onCompleteParams: [target, prop],
  });
};

const setSquares = () => {
  squares.forEach((square) => {
    gsap.set(square, {
      x: `random(${pad},${viewMax.x})`,
      y: `random(${pad},${viewMax.y})`,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });

    gsap.to(square, {
      duration: 0.2,
      scale: 1,
    });

    tweenProperty(square, "x");

    tweenProperty(square, "y");
  });
};

const groupSquaresAtCursor = () => {
  gsap.killTweensOf(squares);
  squares.forEach((square) => {
    console.log("ACTIVE", gsap.isTweening(square));
  });

  gsap.getTweensOf(squares).forEach((t) => t.kill());

  const tl = gsap.timeline();
  tl.to(squares, {
    duration: 0.3,
    borderRadius: "50%",
  });
  tl.to(squares, {
    duration: 0.2,
    scale: 2,
  });

  window.addEventListener("mousemove", squaresFollowCursor);

  squaresFollowCursor();
};

const squaresFollowCursor = () => {
  gsap.to(squares, {
    duration: 0.3,
    x: coords.mouseX,
    y: coords.mouseY,
  });
};

const disperseSquares = () => {
  window.removeEventListener("mousemove", squaresFollowCursor);
  squares.forEach((square) => {
    gsap.to(square, {
      duration: 2,
      scale: 1,
      overwrite: true,
      x: coords.mouseX,
      y: coords.mouseY,

      onComplete() {
        tweenProperty(square, "y");
      },
    });
  });
};

onResize();
setSquares();

window.addEventListener("resize", onResize);
links.forEach((link) =>
  link.addEventListener("mouseenter", groupSquaresAtCursor)
);

window.addEventListener("mousemove", updateMousePosition);
links.forEach((link) => link.addEventListener("mouseout", disperseSquares));

const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const logo = document.querySelector(".logo");
const ham = document.querySelector(".ham");
const headline = document.querySelector("headline");

const tl = new TimelineMax();

tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut });
tl.fromTo(
  hero,
  1.2,
  { width: "100%" },
  { width: "80%", ease: Power2.easeInOut }
);
tl.fromTo(
  slider,
  1.2,
  { x: "-100%" },
  { x: "0%", ease: Power2.easeInOut },
  "-=1.2"
);
tl.fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");
tl.fromTo(ham, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");
tl.fromTo(headline, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");
