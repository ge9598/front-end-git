let dayNight = document.querySelector('.dayNight');
let menuToggle = document.querySelector('.menuToggle');
let body = document.querySelector('body');
let nav = document.querySelector('.navigation');
let h2main = document.querySelector('.main h2');
dayNight.addEventListener('click', () => {
    body.classList.toggle('dark');
    dayNight.classList.toggle('active');
});

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});
h2main.addEventListener('click', () =>{
    console.log("h2");
    h2main.classList.add('block');
});
