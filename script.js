'use strict';

//MODAL WINDOW
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelectorAll('.btn--show-modal');
const closeModalBtn = document.querySelector('.btn--close-modal');

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
const html = `<p class='warn'>Warning:</p>`

//ADDING TO THE CREATED ELEMENT AS THE FIRST CHILD OF THE HEADER
const header = document.querySelector('.header')
header.append(message)
//ADD THE CREATED HTML AS THE FIRST CHILD OF THE CREATED MESSAGE ELEMENT
message.insertAdjacentHTML('afterbegin', html)

//TO REMOVE THE COOKIE BY CLICKING THE BUTTON
const closeCookieBtn = document.querySelector('.btn--close--cookie')

closeCookieBtn.addEventListener('click', function() {
    message.remove()
})

//IMPLEMENTING SMOOTH SCROLL TO SECTION 1
const section1 = document.querySelector('#section--1')
const learnMoreBtn = document.querySelector('.btn--scroll-to')

learnMoreBtn.addEventListener('click', function(){
    section1.scrollIntoView({behavior: 'smooth'})
})



