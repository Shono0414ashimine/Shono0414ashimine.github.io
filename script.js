// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Add parallax effect to geometric shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cubes = document.querySelectorAll('.cube');
    
    cubes.forEach((cube, index) => {
        const speed = 0.5 + (index * 0.2);
        cube.style.transform = `rotate(45deg) translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
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

// === ROBOT TRANSFORMATION === //
let isRobot = true;
const transformBtn = document.getElementById('transformBtn');
const robot = document.getElementById('transformRobot');
const raceCar = document.getElementById('raceCar');

if (transformBtn && robot && raceCar) {
    transformBtn.addEventListener('click', () => {
        if (isRobot) {
            // Transform to race car
            robot.classList.add('transforming');
            
            setTimeout(() => {
                robot.style.display = 'none';
                raceCar.style.display = 'block';
                raceCar.classList.add('transforming');
                transformBtn.textContent = 'Transform Back!';
                isRobot = false;
                
                setTimeout(() => {
                    raceCar.classList.remove('transforming');
                }, 2000);
            }, 1000);
        } else {
            // Transform back to robot
            raceCar.classList.add('transforming');
            
            setTimeout(() => {
                raceCar.style.display = 'none';
                robot.style.display = 'block';
                robot.classList.remove('transforming');
                robot.classList.add('transforming');
                transformBtn.textContent = 'Transform!';
                isRobot = true;
                
                setTimeout(() => {
                    robot.classList.remove('transforming');
                }, 2000);
            }, 1000);
        }
    });
}

// Add sound effect on transformation (optional - requires audio file)
// Uncomment and add audio file if desired
/*
const transformSound = new Audio('transform-sound.mp3');
transformBtn.addEventListener('click', () => {
    transformSound.play();
});
*/