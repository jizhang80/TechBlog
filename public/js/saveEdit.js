async function saveBtnHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const blogElement = document.querySelector('[data-blog-id]');
    const blogId = blogElement.dataset.blogId;

    if (title && content) {
        try {
            const response = await fetch(`/api/blogs/blog/${blogId}`, {
              method: 'PUT',
              body: JSON.stringify({ title, content }),
              headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace(`/blog/${blogId}`);
              } else {
                console.log(response)
                alert(response.status)
              }
            } catch (err) {
              console.log(err)
              res.status(500).json(err);
            };
    }
}

document
.querySelector('.editPost-form')
.addEventListener('submit', saveBtnHandler);