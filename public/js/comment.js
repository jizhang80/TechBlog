// create new comment submit button


async function commentBtnHandler() {
    const commentText = document.querySelector('#commentText').value.trim();
    const blogElement = document.querySelector('[data-blog-id]');
    const blogId = blogElement.dataset.blogId;
    if (commentText) {
        try {
            const response = await fetch(`/api/blogs/blog/${blogId}/comment`, {
              method: 'POST',
              body: JSON.stringify({ content: commentText }),
              headers: { 'Content-Type': 'application/json' },
            });
            console.log(response)
            if (!response.ok) {
                alert(response.status, response.statusText)
                }
            } catch (err) {
                console.log(err)
                res.status(500).json(err);
        };
    }
}

document
.querySelector('.newComment-form')
.addEventListener('submit', commentBtnHandler);