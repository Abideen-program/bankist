'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelectorAll('.btn--show-modal');
const closeModalBtn = document.querySelector('.btn--close-modal');
const section1 = document.querySelector('#section--1');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');

//handling opening of modal window
const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//looping through the buttons
openModalBtn.forEach(btn => btn.addEventListener('click', openModal));

//handling closing of modal window
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//using the close button to close modal windon
closeModalBtn.addEventListener('click', closeModal);
//using overlay to close the modal window
overlay.addEventListener('click', closeModal);
//using ESCAPE KEY to close modal window
const escapeCloseModal = e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
};
document.addEventListener('keydown', escapeCloseModal);

//creating the cookies element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `<p>We use cookies for improved functionalities and analytics.</p> <button class='btn btn--close--cookie'>Got it!</button>`;
const html = `<p class='warn'>Warning:</p>`;

//ADDING TO THE CREATED ELEMENT AS THE FIRST CHILD OF THE HEADER
const header = document.querySelector('.header');
header.append(message);
//ADD THE CREATED HTML AS THE FIRST CHILD OF THE CREATED MESSAGE ELEMENT
message.insertAdjacentHTML('afterbegin', html);

//TO REMOVE THE COOKIE BY CLICKING THE BUTTON
const closeCookieBtn = document.querySelector('.btn--close--cookie');

closeCookieBtn.addEventListener('click', function () {
  message.remove();
});

//IMPLEMENTING SMOOTH SCROLL TO SECTION 1
learnMoreBtn.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//implementing smooth scroll using the navlinks
/*
navLink.forEach((link) => {
  link.addEventListener('click', function(e){
    e.preventDefault()
    const id = this.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })
})
*/

//implementing smooth scrolling using the parent of nav-link via event delegation
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//implementing tab funtionality
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

// using event delegation
tabsContainer.addEventListener('click', function (e) {
  //this is to make sure that the tab button is always clicked
  const clicked = e.target.closest('.operations__tab');
  //don't do anything if the tab button wasn't clicked
  if (!clicked) return;
  //else, remove active class from the tab buttons
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  //then add the active class to the clicked tab button
  clicked.classList.add('operations__tab--active');

  //displaying the tab contents according to the clicked tab button
  //first, remove the active class from all the tab contents
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  //then, add the active class to the content of the clicked button
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//implementing the fade out navbar using event delegation
const nav = document.querySelector('.nav');

//this handles the fade out functionality
const handleFadeOut = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

//fade out function
nav.addEventListener('mouseover', handleFadeOut.bind(0.5));
//to reset the fade out functionality
nav.addEventListener('mouseout', handleFadeOut.bind(1));

//implementing sticky nav bar function
//This is a bad practice, as it wiil cause performance issue on old gadgets
/* 
const intial = section1.getBoundingClientRect()
window.addEventListener('scroll', function() {
  if (window.scrollY > intial.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
})
*/

//implementing sticky nav bar using intersection API
const navHeight = nav.getBoundingClientRect().height; //get the height of the nav bar
const stickyNav = entries => {
  const [entry] = entries; //destructure the entries
  //check if the header is still intersecting with the viewport (Yes, add sticky class to nav)
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky'); //(No, remove sticky class from class)
};

const option = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, option);
headerObserver.observe(header);
