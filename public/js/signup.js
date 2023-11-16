const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      // check password length, there is a db validation
      if (password.length < 8) {
        alert('password length has to longer than 6');
        return;
      }

      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 409) {
          alert(`${email} already registered`);
          return;
        }
    
        if (response.ok) {
          document.location.replace('/login');
        } else {
          console.log(response)
          alert(response.status, response.statusText)
        }
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      };
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);