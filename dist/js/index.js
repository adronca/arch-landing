const headerMenuIcon = document.querySelector('.header__icon');
const headerMenu = document.querySelector('.header__menu');

headerMenuIcon.addEventListener('click', () => {
  headerMenu.classList.toggle('active')
})