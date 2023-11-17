async function editBlogHandler() {
    const blogElement = document.querySelector('[data-blog-id]');
    const blogId = blogElement.dataset.blogId;
    document.location.replace(`/blog/${blogId}/edit`);
}

const editBtn = document.getElementById('editBtn')
editBtn.addEventListener('click', editBlogHandler);