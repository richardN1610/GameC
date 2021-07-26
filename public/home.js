if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}
function ready() {
    var signupBtn = document.getElementsByClassName('signup-btn')[0];
    const closeBtn = document.getElementsByClassName('close-btn')[0];
    signupBtn.addEventListener('click', signup);
    closeBtn.addEventListener('click',clsoeForm);
}

function signup() {
    var signupForm = document.getElementsByClassName('signup-form')[0]
    signupForm.style.display = "block";
}

function clsoeForm(){
    var signupForm = document.getElementsByClassName('signup-form')[0]
    signupForm.style.display = "none";
}