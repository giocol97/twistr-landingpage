const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let scrollPos = 0;
let slideWidth = slider.querySelector('.slide').clientWidth;
let activeDot = 0;

prevBtn.addEventListener('click', () => {
    scrollPos -= slideWidth;
    if (scrollPos < 0) {
        scrollPos = 0;
    }
    slider.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
    });
    setActiveDot();
});

nextBtn.addEventListener('click', () => {
    scrollPos += slideWidth;
    if (scrollPos > slider.scrollWidth - slider.clientWidth) {
        scrollPos = slider.scrollWidth - slider.clientWidth;
    }
    slider.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
    });
    setActiveDot();
});

window.addEventListener('resize', () => {
    slideWidth = slider.querySelector('.slide').clientWidth;
    slider.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
    });
});

function setActiveDot() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots[activeDot].classList.remove('active');
    activeDot = Math.round(scrollPos / slideWidth);
    dots[activeDot].classList.add('active');
}

function createDots() {
    const slides = slider.querySelectorAll('.slide');
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            scrollPos = i * slideWidth;
            slider.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });
            setActiveDot();
        });
        dotsContainer.appendChild(dot);
    }
}

createDots();

let currentImageIndex = 0;
const images = document.querySelectorAll('.slider .slide');
const intervalTime = 5000; // Change this value to adjust the interval time in milliseconds

function changeImage() {
    images[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
}

setInterval(changeImage, intervalTime);