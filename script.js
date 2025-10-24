// Smooth scrolling for navigation links document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener('click', function (e) { e.preventDefault(); const target = document.querySelector(this.getAttribute('href')); if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }); });

// Add scroll animation for sections const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };

const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } }); }, observerOptions);

// Observe all sections document.querySelectorAll('section').forEach(section => { section.style.opacity = '0'; section.style.transform = 'translateY(30px)'; section.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; observer.observe(section); });

// Navbar background on scroll window.addEventListener('scroll', () => { const navbar = document.querySelector('.navbar'); if (window.scrollY > 50) { navbar.style.background = 'rgba(0, 0, 0, 0.98)'; } else { navbar.style.background = 'rgba(0, 0, 0, 0.95)'; } });

// Add parallax effect to geometric shapes window.addEventListener('scroll', () => { const scrolled = window.pageYOffset; const cubes = document.querySelectorAll('.cube');

cubes.forEach((cube, index) => {
    const speed = 0.5 + (index * 0.2);
    cube.style.transform = `rotate(45deg) translateY(${scrolled * speed}px)`;
});
});

// Add typing effect to hero title (optional) const heroTitle = document.querySelector('.hero-title'); if (heroTitle) { const text = heroTitle.textContent; heroTitle.textContent = ''; let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});
}

// === ROBOT INTERACTION CODE === // Ensure robot element exists const robotEl = document.getElementById('transformRobot'); const robotHead = document.getElementById('robotHead');

if (robotEl) { // toggle flying state by clicking the robot container robotEl.closest('.robot-container').addEventListener('click', (e) => { // ignore clicks when transforming to race car if (!robotEl.offsetParent) return; robotEl.classList.toggle('robot--flying'); });

// keyboard 'f' toggles flight
window.addEventListener('keydown', (ev) => {
    if (ev.key === 'f' || ev.key === 'F') {
        robotEl.classList.toggle('robot--flying');
    }
    // 'p' toggles punching animation on/off
    if (ev.key === 'p' || ev.key === 'P') {
        robotEl.classList.toggle('robot--punch');
    }
});

// subtle head tracking: map mouse X inside hero to head tilt
const heroArea = document.querySelector('.hero');
function handleHeadTrack(e) {
    const rect = heroArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;
    if (x < half - 40) {
        robotHead.setAttribute('data-head-tilt', 'left');
    } else if (x > half + 40) {
        robotHead.setAttribute('data-head-tilt', 'right');
    } else {
        robotHead.setAttribute('data-head-tilt', 'center');
        robotHead.style.transform = '';
    }
}

// pointer and touch support
if (heroArea) {
    heroArea.addEventListener('mousemove', handleHeadTrack);
    heroArea.addEventListener('touchmove', (ev) => {
        handleHeadTrack(ev.touches[0]);
    }, {passive:true});
}

// add idle breathing and slight reactive tilt on scroll for depth
let lastScroll = window.scrollY;
window.addEventListener('scroll', () => {
    const delta = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    // small reactive tilt
    if (Math.abs(delta) > 5) {
        robotEl.style.transform = `translateZ(0) rotateX(${Math.sign(delta) * 1.25}deg)`;
        setTimeout(() => robotEl.style.transform = '', 220);
    }
});
}

// === TRANSFORM BUTTON CODE === let isRobot = true; const transformBtn = document.getElementById('transformBtn'); const raceCar = document.getElementById('raceCar');

if (transformBtn && robotEl && raceCar) { transformBtn.addEventListener('click', () => { if (isRobot) { robotEl.classList.add('transforming'); // stabilize animations before transform robotEl.classList.remove('robot--flying'); robotEl.classList.remove('robot--punch');
