const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstname = document.querySelector('#inputFirstname4').value.trim();
    const lastname = document.querySelector('#inputLastname4').value.trim();
    const username = document.querySelector('#inputUsername4').value.trim();
    const password = document.querySelector('#inputPassword4').value.trim();
    const email = document.querySelector('#inputEmail4').value.trim();
    const phone = document.querySelector('#inputPhone4').value.trim();
    const address = document.querySelector('#inputAddress').value.trim();
    const address2 = document.querySelector('#inputAddress2').value.trim();
    const city = document.querySelector('#inputCity').value.trim();
    const state = document.querySelector('#inputState').value.trim();
    const zip = document.querySelector('#inputZip').value.trim();
    const country = document.querySelector('#inputCountry').value.trim();
    var membership = document.querySelector('#gridCheck').checked ? "premium" : "free";
  
    
      console.log(JSON.stringify({username, password, email, firstname, lastname}));

    if (firstname && lastname && username && email && password) {
      const response = await fetch('/users', { 
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