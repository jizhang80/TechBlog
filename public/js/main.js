// handle main page button
function loginBtnHandler() {
    document.location.replace('/login');
}

const loginBtn = document.getElementById('loginBtn')
loginBtn.addEventListener('click', loginBtnHandler);

function signupBtnHandler() {
    document.location.replace('/signup');
}

const signupBtn = document.getElementById('signupBtn')
signupBtn.addEventListener('click', signupBtnHandler);