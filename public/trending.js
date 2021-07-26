var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var fighting = document.getElementsByClassName("F");
    var rpg = document.getElementsByClassName("R");
    var fps = document.getElementsByClassName('FPS');
    var racing = document.getElementsByClassName("race");
    for (i = 0; i < fighting.length; i++) {
        fighting[i].style.display = "none";
        rpg[i].style.display = "none"
        fps [i].style.display = "none";
        racing[i].style.display = "none"
    }

    slideIndex++;
    if (slideIndex > fighting.length) { slideIndex = 1 }

    fighting[slideIndex - 1].style.display = "block";
    rpg[slideIndex - 1].style.display = "block";
    fps[slideIndex -1].style.display="block";
    racing[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
}