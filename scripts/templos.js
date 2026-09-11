const currentYearSpan = document.querySelector("#currentyear");
const today = new Date();
currentYearSpan.textContent = today.getFullYear();

const lastModifiedSpan = document.querySelector("#modifications");
lastModifiedSpan.textContent = document.lastModified;

const hambutton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

hambutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hambutton.classList.toggle('open');
});