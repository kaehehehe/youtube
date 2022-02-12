const defaultHumbergerMenu = document.querySelector('.humberger-menu');
const detailedHumbergerMenu = document.querySelector(
  '.material-icons.humberger-menu'
);
const detailedNav = document.querySelector('.detailed-nav');

defaultHumbergerMenu.addEventListener('click', () => {
  detailedNav.classList.add('show');
});

detailedHumbergerMenu.addEventListener('click', () => {
  detailedNav.classList.remove('show');
});
