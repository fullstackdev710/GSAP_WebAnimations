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

  gsap.getTweensOf(squares).forEach((t) => kill());

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

onResize();
setSquares();

window.addEventListener("resize", onResize);
links.forEach((link) =>
  link.addEventListener("mouseenter", groupSquaresAtCursor)
);
