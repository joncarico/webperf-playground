/* quicklinks https://github.com/GoogleChromeLabs/quicklink */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.quicklink={})}(this,function(e){function n(e){return new Promise(function(n,t,r){(r=new XMLHttpRequest).open("GET",e,r.withCredentials=!0),r.onload=function(){200===r.status?n():t()},r.send()})}var t,r=(t=document.createElement("link")).relList&&t.relList.supports&&t.relList.supports("prefetch")?function(e){return new Promise(function(n,t,r){(r=document.createElement("link")).rel="prefetch",r.href=e,r.onload=n,r.onerror=t,document.head.appendChild(r)})}:n,o=window.requestIdleCallback||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)},i=new Set;function c(e,t,o){if(o=navigator.connection){if(o.saveData)return Promise.reject(new Error("Cannot prefetch, Save-Data is enabled"));if(/2g/.test(o.effectiveType))return Promise.reject(new Error("Cannot prefetch, network conditions are poor"))}return Promise.all([].concat(e).map(function(e){if(!i.has(e))return i.add(e),(t?function(e){return window.fetch?fetch(e,{credentials:"include"}):n(e)}:r)(new URL(e,location.href).toString())}))}e.listen=function(e){if(e||(e={}),window.IntersectionObserver){var n=function(e){e=e||1;var n=[],t=0;function r(){t<e&&n.length>0&&(n.shift()(),t++)}return[function(e){n.push(e)>1||r()},function(){t--,r()}]}(e.throttle||1/0),t=n[0],r=n[1],f=e.limit||1/0,u=e.origins||[location.hostname],s=e.ignores||[],a=e.delay||0,l=[],h=e.timeoutFn||o,d="function"==typeof e.hrefFn&&e.hrefFn,m=new IntersectionObserver(function(n){n.forEach(function(n){if(n.isIntersecting)l.push((n=n.target).href),function(e,n){n?setTimeout(e,n):e()}(function(){-1!==l.indexOf(n.href)&&(m.unobserve(n),i.size<f&&t(function(){c(d?d(n):n.href,e.priority).then(r).catch(function(n){r(),e.onError&&e.onError(n)})}))},a);else{var o=l.indexOf((n=n.target).href);o>-1&&l.splice(o)}})},{threshold:e.threshold||0});return h(function(){(e.el||document).querySelectorAll("a").forEach(function(e){u.length&&!u.includes(e.hostname)||function e(n,t){return Array.isArray(t)?t.some(function(t){return e(n,t)}):(t.test||t).call(t,n.href,n)}(e,s)||m.observe(e)})},{timeout:e.timeout||2e3}),function(){i.clear(),m.disconnect()}}},e.prefetch=c});

/*****************************************/
/* Web Vitals Patterns  https://web.dev/patterns/web-vitals-patterns/ */
/*****************************************/

/* carousels */
function autoplayCarousel() {
  const carouselEl = document.getElementById("carousel");
  const slideContainerEl = carouselEl.querySelector("#slide-container");
  const slideEl = carouselEl.querySelector(".slide");
  let slideWidth = slideEl.offsetWidth;
  // Add click handlers
  document.querySelector("#back-button")
      .addEventListener("click", () => navigate("backward"));
  document.querySelector("#forward-button")
      .addEventListener("click", () => navigate("forward"));
  document.querySelectorAll(".slide-indicator")
      .forEach((dot, index) => {
          dot.addEventListener("click", () => navigate(index));
          dot.addEventListener("mouseenter", () => clearInterval(autoplay));
      });
  // Add keyboard handlers
  document.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowLeft') {
          clearInterval(autoplay);
          navigate("backward");
      } else if (e.code === 'ArrowRight') {
          clearInterval(autoplay);
          navigate("forward");
      }
  });
  // Add resize handler
  window.addEventListener('resize', () => {
      slideWidth = slideEl.offsetWidth;
  });
  // Autoplay
  const autoplay = setInterval(() => navigate("forward"), 3000);
  slideContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));
  // Slide transition
  const getNewScrollPosition = (arg) => {
      const gap = 10;
      const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
      if (arg === "forward") {
          const x = slideContainerEl.scrollLeft + slideWidth + gap;
          return x <= maxScrollLeft ? x : 0;
      } else if (arg === "backward") {
          const x = slideContainerEl.scrollLeft - slideWidth - gap;
          return x >= 0 ? x : maxScrollLeft;
      } else if (typeof arg === "number") {
          const x = arg * (slideWidth + gap);
          return x;
      }
  }
  const navigate = (arg) => {
      slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  }
  // Slide indicators
  const slideObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const slideIndex = entry.target.dataset.slideindex;
              carouselEl.querySelector('.slide-indicator.active').classList.remove('active');
              carouselEl.querySelectorAll('.slide-indicator')[slideIndex].classList.add('active');
          }
      });
  }, { root: slideContainerEl, threshold: .1 });
  document.querySelectorAll('.slide').forEach((slide) => {
      slideObserver.observe(slide);
  });
}
autoplayCarousel();
