"use strict";

//MODAL WINDOW
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const openModalBtn = document.querySelectorAll('.btn--show-modal')
const closeModalBtn = document.querySelector('.btn--close-modal')

//handling opening of modal window
const openModal = () => {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
//looping through the buttons
openModalBtn.forEach((open) => {
    open.addEventListener('click', openModal)
})

//handling closing of modal window
const closeModal = () => {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
//using the close button to close modal windon
closeModalBtn.addEventListener('click', closeModal)
//using overlay to close the modal window
overlay.addEventListener('click', closeModal)
//using ESCAPE KEY to close modal window
const escapeCloseModal = (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal()
    }
}
document.addEventListener('keydown', escapeCloseModal)
