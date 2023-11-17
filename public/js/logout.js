const logout = async () => {
    // Make a POST request to destroy the session on the back end
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    // If successfully logged out, redirect to the login page
    document.location.replace('/');
  };
  
  document.querySelector('#logoutBtn').addEventListener('click', logout);