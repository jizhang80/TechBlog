// create new comment submit button


function commentBtnHandler() {
    const pathname = window.location.pathname;
    document.location.replace(pathname + '/comment');
}

document
.querySelector('.newComment-form')
.addEventListener('submit', commentBtnHandler);