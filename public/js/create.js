const createHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#titleTextarea1').value.trim();
  const content = document.querySelector('#contentTextarea1').value.trim();

  
  if (title && content) {
  
    const response = await fetch('/create', {
      method: 'POST',
      body: JSON.stringify({ title, content}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('#createPost')
  .addEventListener('click', createHandler);