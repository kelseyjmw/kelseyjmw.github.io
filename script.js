/* 
* @author Kelsey White, B00920596, Dalhousie University
* Intro to Web Development
* This is the javascript code for my final project
/*

/*GLOBAL VARIABLES*/
const mobile = document.querySelector(".mobile-menu");
const active = document.querySelector(".active");
const navMenu = document.querySelector(".nav-menu");
const pinkButton = document.querySelector("#pink-button");
const blueButton = document.querySelector("#blue-button");
const root = document.documentElement;
const hero = document.querySelector(".hero");
const h2 = document.querySelector('h2');
const h1 = document.querySelector('.fold-left h1');
const logo = document.querySelector(".logo");
let currentTheme = "green";

/*CODE FOR CAROUSEL*/
const carouselImages = document.querySelector('.carousel-images');
const carouselButtons = document.querySelectorAll('.carousel-button');
const numImages = document.querySelectorAll('.carousel-images img');
let imageIndex = 1;
let translateX = 0;

carouselButtons.forEach(button => {
    button.addEventListener('click', event => {
        if (event.target.id === 'previous') {
            if (imageIndex !== 1) {
                imageIndex --;
                translateX += 100;
            }
        } else {
        if (imageIndex !== numImages) {
            imageIndex ++;
            translateX -= 100;
            }
        }

        carouselImages.style.transform = `translateX(${translateX}%)`;
    })
});

/*EVENT LISTENERS*/
mobile.addEventListener("click", mobileMenu);
pinkButton.addEventListener("click", setPink);
blueButton.addEventListener("click", setBlue);
logo.addEventListener("mouseover", helloMessage);

/*CODE FOR MOBILE NAVIGATION*/
function mobileMenu() {
    navMenu.classList.toggle("active");
}
window.onscroll = function() {stickyBar()};
let navBar = document.querySelector("nav");
let sticky = navBar.offsetTop;


/*FUNCTIONS*/

/*This function will append sticky class to the nav bar, for mobile*/
function stickyBar() {
    if (window.pageYOffset >= sticky) {
        navBar.classList.add("sticky");
    }
    else {
        navBar.classList.remove("sticky");
    }
}

/*This function will set the page colors to the green theme*/
function setGreen() {
    if (currentTheme == "pink"){
        pinkButton.style.setProperty('background-color','#f0f0f0')
        pinkButton.style.setProperty('border-color','#f0f0f0');
    }
    else if (currentTheme == "blue"){
        blueButton.style.setProperty('background-color','#f0f0f0')
        blueButton.style.setProperty('border-color','#f0f0f0');
    }
    root.style.setProperty('--main','#b3e86d');
    root.style.setProperty('--accent1', '#f5b67f');
    root.style.setProperty('--bold','black');
    root.style.setProperty('--body', '#f0f0f0');
    root.style.setProperty('--accent2', '#ffd97d')
    currentTheme = "green";
    h1.style.setProperty('color', 'white');
    hero.style.backgroundImage="url(images/acnhbgdarker.png)";
}

/*This function will set the page colors to the pink theme*/
function setPink() {
    if (currentTheme == "green" || currentTheme == "blue") {
        if (currentTheme == "blue"){
            blueButton.style.setProperty('background-color','#f0f0f0')
            blueButton.style.setProperty('border-color','#f0f0f0');
        }
    root.style.setProperty('--main','#87e0ff');
    root.style.setProperty('--accent1', '#ffe05e');
    root.style.setProperty('--bold','#ff45ae');
    root.style.setProperty('--body', '#dddefa');
    root.style.setProperty('--accent2', '#87e0ff')
    root.style.setProperty('--text', 'black');
    pinkButton.style.setProperty('background-color','#ff45ae')
    pinkButton.style.setProperty('border-color','#ff45ae');
    currentTheme = "pink";
    hero.style.backgroundImage="url(images/cherrybg.png)";
    }
    else if (currentTheme == "pink") {
    setGreen();
    }
}

/*This function will set the page colors to the blue theme*/
function setBlue() { 
    if (currentTheme == "green" || currentTheme == "pink"){
        if (currentTheme == "pink"){
            pinkButton.style.setProperty('background-color','#f0f0f0')
            pinkButton.style.setProperty('border-color','#f0f0f0');
        }
        root.style.setProperty('--main','#51f5df');
        root.style.setProperty('--accent1', '#A17AFF');
        root.style.setProperty('--bold','#576FE6');
        root.style.setProperty('--body', '#f0f0f0');
        root.style.setProperty('--accent2', '#53C0FC')
        blueButton.style.setProperty('background-color','#576FE6')
        blueButton.style.setProperty('border-color','#576FE6');
        currentTheme = "blue";
        hero.style.backgroundImage="url(images/darkbg.png)";
    }
    else if (currentTheme == "blue") {
        setGreen();
    }
}

/*This function prints a pop up message*/
function helloMessage(){
    for (i = 0; i < 2; i++){
        alert("I see you");
        if (i > 0){
            alert("Please stop looking at me")
        }
    }
}

