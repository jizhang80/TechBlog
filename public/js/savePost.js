async function saveBtnHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        try {
            const response = await fetch('/api/blogs/', {
              method: 'POST',
              body: JSON.stringify({ title, content }),
              headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.replace('/dashboard');
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
.querySelector('.newPost-form')
.addEventListener('submit', saveBtnHandler);