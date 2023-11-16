// create new post button handler

function newPostBtnHandler() {
    document.location.replace('/newPost');
}

const loginBtn = document.getElementById('newPostBtn')
loginBtn.addEventListener('click', newPostBtnHandler);