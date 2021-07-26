const toggleMenu = document.getElementsByClassName('menu-btn')[0];
const navList= document.getElementsByClassName('nav-list')[0];
toggleMenu.addEventListener('click', ()=>{
    navList.classList.toggle('active'); //toggle active class for nav ul
})