const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstname = document.querySelector('#InputFirstName1').value.trim();
    const lastname = document.querySelector('#InputLastName1').value.trim();
    const username = document.querySelector('#InputUsername1').value.trim();
    const password = document.querySelector('#InputPassword1').value.trim();
    const email = document.querySelector('#InputEmail1').value.trim();
   
      
      console.log(JSON.stringify({username, password, email, firstname, lastname}));

    if (firstname && lastname && username && email && password) {
      const response = await fetch('/signup', { 
        method: 'POST', 
        body: JSON.stringify({username, password, email, firstname, lastname}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
    } 
  };


  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);