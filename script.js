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

  // get the closest ancestor of the clicked with the class of ".operations__tab"
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

//Revealing sections on scroll
const allSections = document.querySelectorAll('.section'); //selecting all sections

const revealSection = (entries, observer) => {
  const [entry] = entries; //destructuring to get each entry
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
  //check if the entry is intersecting (If yes, remove the hidden class)
  else return; // If no, do nothing
  observer.unobserve(entry.target); //help to stop observing the sections
};

const sectionOption = {
  root: null, //viewport
  threshold: 0.15, //intersection point
};

const sectionObserver = new IntersectionObserver(revealSection, sectionOption);

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden'); //add the hidden class to the sections
});

//implementing lazy loading of images
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return; //if the images is not intersecting return
  entry.target.src = entry.target.dataset.src; // if the images are intersecting, change the src
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); //remove the filter from CSS when loading
  });
  observer.unobserve(entry.target); //stop observing the images
};

const loadOption = {
  root: null,
  threshold: 0,
};

const imageObserver = new IntersectionObserver(lazyLoad, loadOption);

lazyImages.forEach(image => {
  imageObserver.observe(image);
});

//slider function
const sliderFuction = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  let currSlide = 0;
  const maxSlide = slides.length - 1;

  //general function to translate side
  const goToSlide = currentSlide => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    });
  };

  //creating the slider dots based on number of slides
  const dotContainer = document.querySelector('.dots');
  const createDots = () => {
    slides.forEach((_, i) => {
      const html = `<button class="dots__dot" data-slide="${i}"></button>`;
      dotContainer.insertAdjacentHTML('beforeend', html);
    });
  };

  //making dot active
  //we need to active class from the dots first
  const activateDot = slide => {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    //add it bact to tohe dot of active slide
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = () => {
    goToSlide(0); //
    createDots();
    activateDot(0);
  };

  init();

  const nextSlide = () => {
    if (currSlide === maxSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = () => {
    if (currSlide === 0) {
      currSlide = maxSlide;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //handling slide movement with arrow keys
  const arrowKeysCallBack = (entries, observer) => {
    const [entry] = entries;
    if (entry.isIntersecting)
      document.addEventListener('keydown', function (e) {
        e.key === `ArrowRight` && nextSlide();
        e.key === `ArrowLeft` && prevSlide();
      });
    else return;
    observer.unobserve(entry.target);
  };

  const arrowKeysObserver = new IntersectionObserver(arrowKeysCallBack, {
    root: null,
    threshold: 1,
  });
  arrowKeysObserver.observe(slider);

  //changing slides with dots using event delegation
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //get the slide number from the data-set
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliderFuction();


//Hambugger toggle

// const navToggle = document.querySelector('.nav-toggle');
// // const navLink = document.querySelectorAll('.nav__link');
// const eachNavLinks = Array.from(navLink);

// navToggle.addEventListener('click', function() {
//   document.body.toggleAttribute.classList('nav-open')
// })