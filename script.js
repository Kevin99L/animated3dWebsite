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
    media/antibodyGrowth3d/frame-000.png
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

  const frameCount = 103;

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
      img.height * ratio
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
canvas();

var clutter = "";

document
  .querySelector("#page4>h1")
  .textContent.split(" ")
  .forEach(function (dets) {
    clutter += `<span> ${dets} </span>`;
    document.querySelector("#page4>h1").innerHTML = clutter;
  });

gsap.to("#page4>h1>span", {
  scrollTrigger: {
    trigger: `#page4>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});

function canvas1() {
  const canvas = document.querySelector("#page5>canvas");
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
    media/3dSkull/frame-001.png
    media/3dSkull/frame-002.png
    media/3dSkull/frame-003.png
    media/3dSkull/frame-004.png
    media/3dSkull/frame-005.png
    media/3dSkull/frame-006.png
    media/3dSkull/frame-007.png
    media/3dSkull/frame-008.png
    media/3dSkull/frame-009.png
    media/3dSkull/frame-010.png
    media/3dSkull/frame-011.png
    media/3dSkull/frame-012.png
    media/3dSkull/frame-013.png
    media/3dSkull/frame-014.png
    media/3dSkull/frame-015.png
    media/3dSkull/frame-016.png
    media/3dSkull/frame-017.png
    media/3dSkull/frame-018.png
    media/3dSkull/frame-019.png
    media/3dSkull/frame-020.png
    media/3dSkull/frame-021.png
    media/3dSkull/frame-023.png
    media/3dSkull/frame-024.png
    media/3dSkull/frame-025.png
    media/3dSkull/frame-026.png
    media/3dSkull/frame-027.png
    media/3dSkull/frame-028.png
    media/3dSkull/frame-029.png
    media/3dSkull/frame-030.png
    media/3dSkull/frame-031.png
    media/3dSkull/frame-032.png
    media/3dSkull/frame-033.png
    media/3dSkull/frame-034.png
    media/3dSkull/frame-035.png
    media/3dSkull/frame-036.png
    media/3dSkull/frame-037.png
    media/3dSkull/frame-038.png
    media/3dSkull/frame-039.png
    media/3dSkull/frame-040.png
    media/3dSkull/frame-041.png
    media/3dSkull/frame-042.png
    media/3dSkull/frame-043.png
    media/3dSkull/frame-044.png
    media/3dSkull/frame-045.png
    media/3dSkull/frame-046.png
    media/3dSkull/frame-047.png
    media/3dSkull/frame-048.png
    media/3dSkull/frame-049.png
    media/3dSkull/frame-050.png
    media/3dSkull/frame-051.png
    media/3dSkull/frame-052.png
    media/3dSkull/frame-053.png
    media/3dSkull/frame-054.png
    media/3dSkull/frame-055.png
    media/3dSkull/frame-056.png
    media/3dSkull/frame-057.png
    media/3dSkull/frame-058.png
    media/3dSkull/frame-059.png
    media/3dSkull/frame-060.png
    media/3dSkull/frame-061.png
    media/3dSkull/frame-062.png
    media/3dSkull/frame-063.png
    media/3dSkull/frame-064.png
    media/3dSkull/frame-065.png
    media/3dSkull/frame-066.png
    media/3dSkull/frame-067.png
    media/3dSkull/frame-068.png
    media/3dSkull/frame-069.png
    media/3dSkull/frame-070.png
    media/3dSkull/frame-071.png
    media/3dSkull/frame-072.png
    media/3dSkull/frame-073.png
    media/3dSkull/frame-074.png
    media/3dSkull/frame-075.png
    media/3dSkull/frame-076.png
    media/3dSkull/frame-077.png
    media/3dSkull/frame-078.png
    media/3dSkull/frame-079.png
    media/3dSkull/frame-080.png
    media/3dSkull/frame-081.png
    media/3dSkull/frame-082.png
    media/3dSkull/frame-083.png
    media/3dSkull/frame-084.png
    media/3dSkull/frame-085.png
    media/3dSkull/frame-086.png
    media/3dSkull/frame-087.png
    media/3dSkull/frame-088.png
    media/3dSkull/frame-089.png
    media/3dSkull/frame-090.png
    media/3dSkull/frame-091.png
    media/3dSkull/frame-092.png
    media/3dSkull/frame-093.png
    media/3dSkull/frame-094.png
    media/3dSkull/frame-095.png
    media/3dSkull/frame-096.png
    media/3dSkull/frame-097.png
    media/3dSkull/frame-098.png
    media/3dSkull/frame-099.png
    media/3dSkull/frame-100.png
    media/3dSkull/frame-101.png
    media/3dSkull/frame-102.png
    `;
    return data.split("\n")[index];
  }

  const frameCount = 103;

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
      trigger: `#page5>canvas`,
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
      img.height * ratio
    );
  }

  ScrollTrigger.create({
    //object you want to pin it
    trigger: "#page5",
    pin: true,
    // markers: true,
    scroller: `#main`,
    // set start end according to preference
    start: `top top`,
    end: `250% top`,
  });
}
canvas1();

var clutter = "";

document
  .querySelector("#page6>h1")
  .textContent.split(" ")
  .forEach(function (dets) {
    clutter += `<span> ${dets} </span>`;
    document.querySelector("#page6>h1").innerHTML = clutter;
  });

gsap.to("#page6>h1>span", {
  scrollTrigger: {
    trigger: `#page6>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});

function canvas2() {
  const canvas = document.querySelector("#page7>canvas");
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
    media/paper/1.webp
    media/paper/2.webp
    media/paper/3.webp
    media/paper/4.webp
    media/paper/5.webp
    media/paper/6.webp
    media/paper/7.webp
    media/paper/8.webp
    media/paper/9.webp
    media/paper/10.webp
    media/paper/11.webp
    media/paper/12.webp
    media/paper/13.webp
    media/paper/14.webp
    media/paper/15.webp
    media/paper/16.webp
    media/paper/17.webp
    media/paper/18.webp
    media/paper/19.webp
    media/paper/20.webp
    media/paper/21.webp
    media/paper/22.webp
    media/paper/23.webp
    media/paper/24.webp
    media/paper/25.webp
    media/paper/26.webp
    media/paper/27.webp
    media/paper/28.webp
    media/paper/29.webp
    media/paper/30.webp
    media/paper/31.webp
    media/paper/32.webp
    media/paper/33.webp
    media/paper/34.webp
    media/paper/35.webp
    media/paper/36.webp
    media/paper/37.webp
    media/paper/38.webp
    media/paper/39.webp
    media/paper/40.webp
    media/paper/41.webp
    media/paper/42.webp
    media/paper/43.webp
    media/paper/44.webp
    media/paper/45.webp
    media/paper/46.webp
    media/paper/47.webp
    media/paper/48.webp
    media/paper/49.webp
    media/paper/50.webp
    media/paper/51.webp
    media/paper/52.webp
    media/paper/53.webp
    media/paper/54.webp
    media/paper/55.webp
    media/paper/56.webp
    media/paper/57.webp
    media/paper/58.webp
    media/paper/59.webp
    media/paper/60.webp
    media/paper/61.webp
    media/paper/62.webp
    media/paper/63.webp
    media/paper/64.webp
    media/paper/65.webp
    media/paper/66.webp
    media/paper/67.webp
    media/paper/68.webp
    media/paper/69.webp
    media/paper/70.webp
    media/paper/71.webp
    media/paper/72.webp
    media/paper/73.webp
    media/paper/74.webp
    media/paper/75.webp
    media/paper/76.webp
    media/paper/77.webp
    media/paper/78.webp
    media/paper/79.webp
    media/paper/80.webp
    media/paper/81.webp
    media/paper/82.webp
    media/paper/83.webp
    media/paper/84.webp
    media/paper/85.webp
    media/paper/86.webp
    media/paper/87.webp
    media/paper/88.webp
    media/paper/89.webp
    media/paper/90.webp
    media/paper/91.webp
    media/paper/92.webp
    media/paper/93.webp
    media/paper/94.webp
    media/paper/95.webp
    media/paper/96.webp
    media/paper/97.webp
    media/paper/98.webp
    media/paper/99.webp
    media/paper/100.webp
    media/paper/101.webp
    media/paper/102.webp
    media/paper/103.webp
    media/paper/104.webp
    media/paper/105.webp
    media/paper/106.webp
    media/paper/107.webp
    media/paper/108.webp
    media/paper/109.webp
    media/paper/110.webp
    media/paper/111.webp
    media/paper/112.webp
    media/paper/113.webp
    media/paper/114.webp
    media/paper/115.webp
    media/paper/116.webp
    media/paper/117.webp
    media/paper/118.webp
    media/paper/119.webp
    media/paper/120.webp
    media/paper/121.webp
    media/paper/122.webp
    media/paper/123.webp
    media/paper/124.webp
    media/paper/125.webp
    media/paper/126.webp
    media/paper/127.webp
    media/paper/128.webp
    media/paper/129.webp
    media/paper/130.webp
    media/paper/131.webp
    media/paper/132.webp
    media/paper/133.webp
    media/paper/134.webp
    media/paper/135.webp
    media/paper/136.webp
    `;
    return data.split("\n")[index];
  }

  const frameCount = 137;

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
      trigger: `#page7>canvas`,
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
      img.height * ratio
    );
  }

  ScrollTrigger.create({
    //object you want to pin it
    trigger: "#page7",
    pin: true,
    // markers: true,
    scroller: `#main`,
    // set start end according to preference
    start: `top top`,
    end: `250% top`,
  });
}
canvas2();

gsap.to(".page7-cir",{
  scrollTrigger:{
    trigger: `.page7-cir`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5
  },
  scale: 1.5
})

gsap.to(".page7-cir-inner",{
  scrollTrigger:{
    trigger: `.page7-cir-inner`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5
  },
  backgroundColor: `#0a3cce91`
})