
/*
Note: 
- this is my first canvas piece and first interaction with es6.
- if there are ways of improving this i would love you to reach out and let me know. 
*/


// create funMouse function 
function funMouse() {
  
  
  
  
    // get canvas
    const canvas = document.querySelector(".js--canvas");
    const canvasContext = canvas.getContext("2d");
  
    
    
    
    // set canvas size
    let canvasWidth = (canvas.width = window.innerWidth);
    let canvasHeight = (canvas.height = window.innerHeight);
  
    
    
    
    // get mouse position
    let mouseX = canvasWidth / 2;
    let mouseY = canvasHeight / 2;
  
    
    
    
    // create circles
    let circle = {
      radius: 12,
      lastX: mouseX,
      lastY: mouseY
    };
  
    let miniCircle = {
      radius: 3,
      lastX: mouseX,
      lastY: mouseY
    };
  
    
    
    
    // get all data-hover elements
    // obvi this is better one a web page with more than one anchor tag
    const elements = [...document.querySelectorAll("a")];
  
    
    
    
    // resize canvas function
    var resizeCanvas = function resizeCanvas() {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
    };
  
    
    
    
    // create var holding mouseRender function
    var mouseRender = function mouseRender() {
      
      
      // clear canvas so no colours or styles overlap
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
  
      
      // get circles x-coordinate and y-coordinate based on mouse coordinates
      // the small circle has a slight delay due to the last parms passed
      circle.lastX = lerp(circle.lastX, mouseX, 0.5);
      circle.lastY = lerp(circle.lastY, mouseY, 0.5);
      
      miniCircle.lastX = lerp(miniCircle.lastX, mouseX, 0.1);
      miniCircle.lastY = lerp(miniCircle.lastY, mouseY, 0.1);
  
      
      // create first circle
      canvasContext.beginPath();
      canvasContext.arc(
        circle.lastX,
        circle.lastY,
        circle.radius,
        0,
        Math.PI * 2,
        false
      );
      canvasContext.lineWidth = 2;
      canvasContext.strokeStyle = "white";
      canvasContext.stroke();
      canvasContext.closePath();
  
      
      // create small/second circle
      canvasContext.beginPath();
      canvasContext.arc(
        miniCircle.lastX,
        miniCircle.lastY,
        miniCircle.radius,
        0,
        Math.PI * 2,
        false
      );
      canvasContext.fillStyle = "white";
      canvasContext.fill();
      canvasContext.closePath();
  
      
      // render/draw mouse by calling requestAnimationFrame() and passing itself through
      requestAnimationFrame(mouseRender);
    };
  
    
    
    
    // mouseInit function
    var mouseInit = function mouseInit() {
      
      
      // render/draw mouse by calling requestAnimationFrame() and passing mouseRender
      requestAnimationFrame(mouseRender);
  
      
      // on mouse move update coordinates
      window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
  
      
      // update canvas size on window resize
      window.addEventListener("resize", resizeCanvas, false);
  
      
      // style mouse on hover function
      function on() {
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.beginPath();
        canvasContext.arc(
          circle.lastX,
          circle.lastY,
          circle.radius,
          0,
          Math.PI * 2,
          false
        );
        canvasContext.lineWidth = 3;
        canvasContext.strokeStyle = "#46C1F6";
        canvasContext.stroke();
        canvasContext.closePath();
  
        requestAnimationFrame(on);
      }
  
      
      // style mouse off hover
      // should be the same are prior to any hover
      // i noticed if i don't do this then the on styles will stay even after hover
      function off() {
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.beginPath();
        canvasContext.arc(
          circle.lastX,
          circle.lastY,
          circle.radius,
          0,
          Math.PI * 2,
          false
        );
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = "white";
        canvasContext.stroke();
        canvasContext.closePath();
  
        canvasContext.beginPath();
        canvasContext.arc(
          miniCircle.lastX,
          miniCircle.lastY,
          miniCircle.radius,
          0,
          Math.PI * 2,
          false
        );
        canvasContext.fillStyle = "white";
        canvasContext.fill();
        canvasContext.closePath();
  
        requestAnimationFrame(off);
      }
  
      
      // using TweenMax.min.js by GSAP addin easing for radius for circle
      // https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js
      let tween = TweenMax.to(circle, 0.25, {
        radius: circle.radius * 2.5,
        ease: Power1.easeInOut,
        paused: true
      });
  
      
      // for each hover element add mouseenter and mouseleave actions
      elements.forEach((el) => {
        el.addEventListener( "mouseenter", () => { on(); }, false );
        el.addEventListener( "mouseleave", () => { off(); }, false );
        el.addEventListener( "mouseenter", () => { tween.play(); }, false );
        el.addEventListener( "mouseleave", () => { tween.reverse(); }, false );
      });
    };
  
    
    // tbh this is from ReGGae's pen that is added in the html comment at the top
    // from my understanding it does a bunch of math to figure out a smooth position update, including the delay on the mini circle
    // my [very poor] translation of this math:
    // shape.lastX = lerp(shape.lastX, mouseX, delay);
    // above === below
    // return (1 - delay) * shape.lastX + delay * mouseX;
    var lerp = function lerp(a, b, n) {
      return (1 - n) * a + n * b;
    };
  
    
    //init the mouse function
    mouseInit();
  }
  
  
  // run fun mouse to have this cursor
  funMouse();



$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', ()=>{
   //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");

    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});

  });
  

  function animateHomePage(){
    var tl = gsap.timeline();
    tl
    .from("nav",{
      y:50,
      opacity:0,
      // delay:4.5,
      // stagger:.05,
      ease:Expo.easeInOut
  })
    .from(".project .title",{
      y:500,
      opacity:0,
      duration:.9,
      ease:Expo.easeInOut
  })
    .from(".project h3",{
      y:500,
      opacity:0,
      duration:1,
      ease:Expo.easeInOut
  })
    .from(".contact h3",{
      y:500,
      opacity:0,
      duration:.8,
      ease:Expo.easeInOut
  })
 
    
  }
  animateHomePage();


  gsap.from(".wrapper ",{
    scrollTrigger:{
        scroller:"body",
        trigger:".contact",
        start:"top 60%",
        end:"top 70%",
        scrub:4,
        pin:true,
    //  markers:true
    },
    opacity:0,
    y: 500,
    duration:1,
    // delay:.5,
    stagger:.5,
    ease: Expo.easeinOut
  });
  gsap.from(".contact .right",{
    scrollTrigger:{
        scroller:"body",
        trigger:".contact",
        start:"top 50%",
        end:"top 60%",
        scrub:4,
        pin:true,
    //  markers:true
    },
    opacity:0,
    x: -500,
    duration:1,
    // delay:5,
    // stagger:.5,
    ease: Expo.easeinOut
  });
