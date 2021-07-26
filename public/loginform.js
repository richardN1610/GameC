if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready(){
    const loginFormCloseBtn = document.getElementsByClassName('loginform-btn')[0];
    loginFormCloseBtn.addEventListener('click',closeLoginForm);
}

function closeLoginForm(){
    var signupForm = document.getElementsByClassName('login-form')[0]
    signupForm.style.display = "none";
    window.location.replace('/');
}