function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

var clutter = "";

document
  .querySelector("#page2>h1")
  .textContent.split(" ")
  .forEach(function (dets) {
    clutter += `<span> ${dets} </span>`;
    document.querySelector("#page2>h1").innerHTML = clutter;
  });

gsap.to("#page2>h1>span", {
  scrollTrigger: {
    trigger: `#page2>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});

function canvas() {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    // paste all images here
    var data = `
    media/antibodyGrowth3d/frame-001.png
    media/antibodyGrowth3d/frame-002.png
    media/antibodyGrowth3d/frame-003.png
    media/antibodyGrowth3d/frame-004.png
    media/antibodyGrowth3d/frame-005.png
    media/antibodyGrowth3d/frame-006.png
    media/antibodyGrowth3d/frame-007.png
    media/antibodyGrowth3d/frame-008.png
    media/antibodyGrowth3d/frame-009.png
    media/antibodyGrowth3d/frame-010.png
    media/antibodyGrowth3d/frame-011.png
    media/antibodyGrowth3d/frame-012.png
    media/antibodyGrowth3d/frame-013.png
    media/antibodyGrowth3d/frame-014.png
    media/antibodyGrowth3d/frame-015.png
    media/antibodyGrowth3d/frame-016.png
    media/antibodyGrowth3d/frame-017.png
    media/antibodyGrowth3d/frame-018.png
    media/antibodyGrowth3d/frame-019.png
    media/antibodyGrowth3d/frame-020.png
    media/antibodyGrowth3d/frame-021.png
    media/antibodyGrowth3d/frame-023.png
    media/antibodyGrowth3d/frame-024.png
    media/antibodyGrowth3d/frame-025.png
    media/antibodyGrowth3d/frame-026.png
    media/antibodyGrowth3d/frame-027.png
    media/antibodyGrowth3d/frame-028.png
    media/antibodyGrowth3d/frame-029.png
    media/antibodyGrowth3d/frame-030.png
    media/antibodyGrowth3d/frame-031.png
    media/antibodyGrowth3d/frame-032.png
    media/antibodyGrowth3d/frame-033.png
    media/antibodyGrowth3d/frame-034.png
    media/antibodyGrowth3d/frame-035.png
    media/antibodyGrowth3d/frame-036.png
    media/antibodyGrowth3d/frame-037.png
    media/antibodyGrowth3d/frame-038.png
    media/antibodyGrowth3d/frame-039.png
    media/antibodyGrowth3d/frame-040.png
    media/antibodyGrowth3d/frame-041.png
    media/antibodyGrowth3d/frame-042.png
    media/antibodyGrowth3d/frame-043.png
    media/antibodyGrowth3d/frame-044.png
    media/antibodyGrowth3d/frame-045.png
    media/antibodyGrowth3d/frame-046.png
    media/antibodyGrowth3d/frame-047.png
    media/antibodyGrowth3d/frame-048.png
    media/antibodyGrowth3d/frame-049.png
    media/antibodyGrowth3d/frame-050.png
    media/antibodyGrowth3d/frame-051.png
    media/antibodyGrowth3d/frame-052.png
    media/antibodyGrowth3d/frame-053.png
    media/antibodyGrowth3d/frame-054.png
    media/antibodyGrowth3d/frame-055.png
    media/antibodyGrowth3d/frame-056.png
    media/antibodyGrowth3d/frame-057.png
    media/antibodyGrowth3d/frame-058.png
    media/antibodyGrowth3d/frame-059.png
    media/antibodyGrowth3d/frame-060.png
    media/antibodyGrowth3d/frame-061.png
    media/antibodyGrowth3d/frame-062.png
    media/antibodyGrowth3d/frame-063.png
    media/antibodyGrowth3d/frame-064.png
    media/antibodyGrowth3d/frame-065.png
    media/antibodyGrowth3d/frame-066.png
    media/antibodyGrowth3d/frame-067.png
    media/antibodyGrowth3d/frame-068.png
    media/antibodyGrowth3d/frame-069.png
    media/antibodyGrowth3d/frame-070.png
    media/antibodyGrowth3d/frame-071.png
    media/antibodyGrowth3d/frame-072.png
    media/antibodyGrowth3d/frame-073.png
    media/antibodyGrowth3d/frame-074.png
    media/antibodyGrowth3d/frame-075.png
    media/antibodyGrowth3d/frame-076.png
    media/antibodyGrowth3d/frame-077.png
    media/antibodyGrowth3d/frame-078.png
    media/antibodyGrowth3d/frame-079.png
    media/antibodyGrowth3d/frame-080.png
    media/antibodyGrowth3d/frame-081.png
    media/antibodyGrowth3d/frame-082.png
    media/antibodyGrowth3d/frame-083.png
    media/antibodyGrowth3d/frame-084.png
    media/antibodyGrowth3d/frame-085.png
    media/antibodyGrowth3d/frame-086.png
    media/antibodyGrowth3d/frame-087.png
    media/antibodyGrowth3d/frame-088.png
    media/antibodyGrowth3d/frame-089.png
    media/antibodyGrowth3d/frame-090.png
    media/antibodyGrowth3d/frame-091.png
    media/antibodyGrowth3d/frame-092.png
    media/antibodyGrowth3d/frame-093.png
    media/antibodyGrowth3d/frame-094.png
    media/antibodyGrowth3d/frame-095.png
    media/antibodyGrowth3d/frame-096.png
    media/antibodyGrowth3d/frame-097.png
    media/antibodyGrowth3d/frame-098.png
    media/antibodyGrowth3d/frame-099.png
    media/antibodyGrowth3d/frame-100.png
    media/antibodyGrowth3d/frame-101.png
    media/antibodyGrowth3d/frame-102.png
    `;
    return data.split("\n")[index];
  }

  const frameCount = 102;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page3>canvas`,
      // set start end according to preference
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio,
    );
  }

  ScrollTrigger.create({
    //object you want to pin it
    trigger: "#page3",
    pin: true,
    // markers: true,
    scroller: `#main`,
    // set start end according to preference
    start: `top top`,
    end: `250% top`,

  });
}
canvas()